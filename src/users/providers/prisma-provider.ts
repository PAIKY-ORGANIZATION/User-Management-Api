import {PrismaClient} from "../../generated/prisma/index.js"
import {User} from 'user-manager-types'

export class PrismaUserRepository  {
    constructor(private readonly prisma: PrismaClient){}

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findFirst({
            where: {
                email
            }
        })

        if(!user){ return null}

        return new User(user.id, user.email, user.username, user.password)
                
    }

    async create(user: User): Promise<User>{
        const dbUser = await this.prisma.user.create({
            data: {
                id: user.id,
                email: user.email,
                username: user.username,
                password: user.password
            }
        })


        
        return new User(dbUser.id, dbUser.email, dbUser.username, dbUser.password) //* currently we aren't really doing anything with this returned value.
    }

}