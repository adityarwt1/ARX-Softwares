"use server"

import { JWT_TOKEN_INTERFACE } from "@/interfaces/auth/jwtToken"
import { NextRequest } from "next/server"
import { verifyToken } from "../authenticationsJose"

interface UserAuthenticationResponse {
    isAuthorizedAccess:boolean,
    tokenData?:JWT_TOKEN_INTERFACE
}
export const isUserAuthunticated = async (req:NextRequest):Promise<UserAuthenticationResponse> =>{
    try {
        const requestHeaderFunction = req.headers
        const sessionToken = requestHeaderFunction.get("authorization")?.split(" ")[1]
        const publicKeyFromHeader = requestHeaderFunction.get("x-public-key")
        const publicKey = publicKeyFromHeader || process.env.JOSE_PUBLIC_KEY || process.env.NEXT_PUBLIC_JOSE_PUBLIC_KEY

        if(!sessionToken || !publicKey){
            return {
                isAuthorizedAccess:false
            }
        }
        
        const verifyJoshToken = await verifyToken({
            token:sessionToken,
            publickKey:publicKey
        })
        // if token validations fails
        if(!verifyJoshToken.isVerified || !verifyJoshToken.tokenData){
            return {
                isAuthorizedAccess:false
            }
        }

        else return {
            isAuthorizedAccess:true, 
            tokenData:verifyJoshToken.tokenData
        }
    } catch (error) {
        console.log((error as Error).message)
        return {
            isAuthorizedAccess:false
        }
    }
}