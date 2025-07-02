


/**
 * % This is what we get when we call jwt.verify(token, secret)
 */

type JwtPayloadBack = {
    id: string,
    exp: number,
    iat: number
}
