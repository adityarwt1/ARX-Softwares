import { importPKCS8, importSPKI, jwtVerify, SignJWT } from "jose";

const readEnvKey = (key: string): string | undefined =>
    process.env[key]?.replace(/\\n/g, "\n")

export const getPublicKey = (): string | undefined => readEnvKey("JOSE_PUBLIC_KEY")

interface JWTTJoseTokenInterface {
    sessionId:string
    exp?:string
}

interface JWTJoseTokenGetTokneResturnInterface{
    isGenerated:boolean,
    token?:string
}
export const getToken = async (data:JWTTJoseTokenInterface):Promise<JWTJoseTokenGetTokneResturnInterface> =>{
    try {
        const privateKeyPem = process.env.JOSE_PRIVATE_KEY?.replace(/\\n/g, "\n")
        if(!privateKeyPem){
            return {isGenerated:false}
        }
        const privateKey = await importPKCS8(privateKeyPem, "EdDSA")

        const token  = await  new SignJWT({
            sessionId:data.sessionId,
        })
        .setProtectedHeader({
            alg:"EdDSA",
            typ:"JWT"
        })
        .setIssuedAt()
        .setExpirationTime(data?.exp || "7d")
        .sign(privateKey)

        if(!token){
            return  {isGenerated:false}
        }
        else return  {
            isGenerated:true,
            token
        }
    } catch {
        return {
            isGenerated:false
        }
    }
}


export const  verifyToken = async (data:{token:string, publickKey?:string}):Promise<{
    isVerified:boolean,
    tokenData?:{
        sessionId:string
    }
}> => {
    try {
        const publicKeyPem = data.publickKey || getPublicKey()
        if(!publicKeyPem){
            return {isVerified:false}
        }
        const publicKey = await importSPKI(publicKeyPem, "EdDSA")
        const {payload}  = await jwtVerify(data.token, publicKey)
        if(typeof payload.sessionId !== "string"){
            return {
                isVerified:false
            }
        }
        else return {
            isVerified:true,
            tokenData:{sessionId:payload.sessionId}
        }
    } catch {
        return {
            isVerified:false,
        }
    }
}