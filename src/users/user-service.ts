import {IUserService, User} from 'user-manager-types'
import { JwtTokenProvider } from './providers/jwt-provider.js';
import { BcryptHasher } from './providers/hash-provider.js';
import { PrismaUserRepository } from './providers/prisma-provider.js';
import crypto from 'node:crypto'

export class UserService implements IUserService{
    constructor(public jwtProvider: JwtTokenProvider, public bcryptHasher: BcryptHasher, public prismaRepository: PrismaUserRepository ){}

    async register (email: string, username: string, password: string): Promise<{user: User}>{

        await this.prismaRepository.findByEmail(email)

        const passwordHash = await this.bcryptHasher.hash(password)

        const created =  await this.prismaRepository.create(crypto.randomUUID(), email, username, passwordHash)

        return {user: created}
    }

    async login(email: string, password: string): Promise<{token: string;}>{
        const user = await  this.prismaRepository.findByEmail(email)
        
        await this.bcryptHasher.compare(password, user!.password)

        const token = this.jwtProvider.generate({id: user!.id})

        return {token}
    }

    verifyToken(token: string): {id: string} {
        return this.jwtProvider.verify(token)
    }

    
}