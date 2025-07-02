import bcrypt from "bcrypt";

export class BcryptHasher  {
    private readonly saltRounds = 10;

    async hash(password: string): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }

    async compare(password: string, hash: string){
        const passwordMatch = bcrypt.compare(password, hash);
        if(!passwordMatch){
            throw new Error('Invalid password')
        }
    }
}