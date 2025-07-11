import {IUserService, JwtPayloadBack, LoginRequestBody, SignupRequestBody, User, } from 'user-manager-sdk'
import { JwtTokenProvider } from './providers/jwt-provider.js';
import { BcryptHasher } from './providers/hash-provider.js';
import { PrismaUserRepository } from './providers/prisma-provider.js';
import crypto from 'node:crypto'
import { BadRequest } from 'custom-exceptions-express';

export class UserService implements IUserService{
    constructor(
        public jwtProvider: JwtTokenProvider,
        public bcryptHasher: BcryptHasher,
        public prismaRepository: PrismaUserRepository
    ){}

    async register ({email, username, password}: SignupRequestBody): Promise<User>{

        const user = await this.prismaRepository.findByEmail(email)

        if(user) throw new BadRequest('User already exists')

        const passwordHash = await this.bcryptHasher.hash(password)

        const created =  await this.prismaRepository.create(crypto.randomUUID(), email, username, passwordHash)

        return created
    }

    async login({email, password}: LoginRequestBody): Promise<{token: string;}>{
        const user = await  this.prismaRepository.findByEmail(email)

        if(!user) throw new BadRequest('User already exists')

        await this.bcryptHasher.compare(password, user.password)

        const token = this.jwtProvider.generate({id: user.id})

        return {token}
    }

     verifyToken(token: string): JwtPayloadBack {
        return this.jwtProvider.verify(token)
    }
}

