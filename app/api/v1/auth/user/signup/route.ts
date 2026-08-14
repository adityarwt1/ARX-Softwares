import { HTTP_Response } from "@/interfaces/httpResponse/httpServerResponse";
import { internalServerIssue, resultantResponse } from "@/utils/httpResponses";
import { NextRequest, NextResponse } from "next/server";
interface CreateUserResponse {
    accessToken:string
}
export async function POST(req:NextRequest):Promise<NextResponse< HTTP_Response<CreateUserResponse>>> {
    try {
        return resultantResponse<CreateUserResponse>({
            data:{
                accessToken:"DUMMY"
            }
        })
    } catch (error) {
        console.log(error)
        return internalServerIssue<CreateUserResponse>({
            errorMessage:(error as Error).message
        })
    }
}