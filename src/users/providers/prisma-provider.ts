import { BadRequest } from "custom-exceptions-express"
import {PrismaClient} from "../../generated/prisma/index.js"
import {User} from 'user-manager-sdk'

export class PrismaUserRepository  {
    constructor(private readonly prisma: PrismaClient){}

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findFirst({
            where: {
                email
            }
        })
        
        if(!user) return null

        return user
    }

    async create(id: string, email: string, username: string, password: string): Promise<User>{
        const dbUser = await this.prisma.user.create({
            data: { id, email, username, password}
        })
        if(!dbUser){
            throw new BadRequest('User not found')
        }

        return new User(dbUser.id, dbUser.email, dbUser.username, dbUser.password) //* currently we aren't really doing anything with this returned value.
    }

}