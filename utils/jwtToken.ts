import jwt from 'jsonwebtoken'
import crypto from 'crypto'

interface JWT_TOKEN_CREATE_INTERFACE {
    jwtSecret: jwt.Secret
    payload: string | object | Buffer | jwt.JwtPayload
    expireIn?: jwt.SignOptions['expiresIn']
}

const randomString = crypto.randomBytes(8).toString('hex')

export const createToken = async ({ jwtSecret, payload, expireIn }: JWT_TOKEN_CREATE_INTERFACE): Promise<string> => {
    const signOptions: jwt.SignOptions = {
        expiresIn: expireIn,
        jwtid: randomString,
    }

    return jwt.sign(payload, jwtSecret, signOptions)
}