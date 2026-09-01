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
        const sessionToken =  requestHeaderFunction.get("authorization")?.split(" ")[1]
        const publicKey = requestHeaderFunction.get("X-PUBLIC-KEY")

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