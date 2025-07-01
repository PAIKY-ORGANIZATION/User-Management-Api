import jwt from "jsonwebtoken";


export class JwtTokenProvider  {

    constructor(private readonly secret: string,){}


    generate(payload: object): string {
        //¡ Set JWT_SECRET in .env
        return jwt.sign(payload, this.secret, {expiresIn: "1h"});
    }

    verify<T = object>(token: string): T{
        return jwt.verify(token, this.secret) as T
    }
}