import { HTTP_STATUS_CODE } from "@/enums/httpRequest/statusCode";
import dbConnect from "@/lib/mongodb";
import Session from "@/models/session";
import User from "@/models/user";
import { StandarApiResponseV1 } from "@/types/apiRespnse/ApiResponse";
import { getPublicKey, getToken } from "@/utils/authenticationsJose";
import { badRequest, conflict, internalServerIssue, resultantResponse } from "@/utils/httpResponses";
import { CreateUserSchema } from "@/validations/userSignup/userValidations";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

/**
 * when i api response send refresh the page to use the default strategy
 */
export async function POST(req:NextRequest):Promise<StandarApiResponseV1<unknown >> {
    try {
        const  userCreateData = await req.json()
        // prevenet misslineous in the request by veryfying the data
        const isValidRequest =await CreateUserSchema.safeParseAsync(userCreateData)
        if(!isValidRequest.success){
            const {message}= JSON.parse(isValidRequest.error.message)[0]
            // const errorArray = JSON.parse(isValidRequest.error.message)
            // return NextResponse.json({
            //     success:false,
            //     error:{
            //         message:errorArray,
            //         status_code:HTTP_STATUS_CODE.BAD_REQUEST
            //     }
            // })
            return badRequest({
                errorMessage: message || isValidRequest.error.message    || "Bad Request!"
            })
        }

        /// checking databser connectoin 
        const isDbConnected = await dbConnect()
        if(!isDbConnected){
            return internalServerIssue({
                errorMessage:"Internal server isssue!"
            })
        }

        const userData =  isValidRequest.data

        const  isUserExistAlready = await  User.findOne({
            email:userData.email
        }).select("_id")

        if(isUserExistAlready){
            return conflict({
                errorMessage:"User already exist with  this email!"
            })
        }
        // password Hashing
        const hashedPassword = await bcrypt.hash(userData.password, 10)
        const publicKey = getPublicKey()
        if(!publicKey){
            return internalServerIssue({
                errorMessage:"JOSE signing keys are not configured!"
            })
        }
       
        const userDoc = new User({...userData, password:hashedPassword})
        await userDoc.save()

        // faild to create user
        if(!userDoc){
            return internalServerIssue({
                errorMessage:"Failed to creater user!"
            })
        }

        // create session for seperate
        //  7 day after date fillup 
        const today = new Date()
        const dateFormatFor7Days = new Date(today)
        dateFormatFor7Days.setDate(today.getDate() + 7)
        const newSessionAssignment = new Session({
            userId:userDoc._id,
            exp:  dateFormatFor7Days|| process.env.TOKEN_EXP_STRATEGY || "7d" , 
            isConsumer:true
        })



        await newSessionAssignment.save()

        if(!newSessionAssignment){
            return internalServerIssue({
                errorMessage:"Failed to  create session!"
            })
        }
        const tokenResult = await getToken({
            sessionId: newSessionAssignment._id.toString(),
            exp: process.env.TOKEN_EXP_STRATEGY || "7d"
        })
        if(!tokenResult.isGenerated || !tokenResult.token){
            return internalServerIssue({
                errorMessage:"Failed to create authentication token!"
            })
        }

        const response = await resultantResponse({
            data: {
                token: tokenResult.token,
                publicKey
            }
        })
        response.cookies.set("access_token", tokenResult.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7
        })
        return response
    } catch (error) {
        console.log((error as Error).message)
        return internalServerIssue({
            errorMessage:(error as Error)?.message || "Internal server issue!"
        })
    }
} 