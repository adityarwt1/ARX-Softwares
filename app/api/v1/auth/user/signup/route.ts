import { HTTP_Response } from "@/interfaces/httpResponse/httpServerResponse";
import { internalServerIssue } from "@/utils/httpResponses";
import { NextRequest, NextResponse } from "next/server";
interface CreateUserResponse {
    accessToken:string
}
export async function POST(req:NextRequest):Promise<NextResponse< HTTP_Response<CreateUserResponse>>> {
    try {
        
    } catch (error) {
        console.log(error)
        return internalServerIssue<CreateUserResponse>({
            errorMessage:(error as Error).message
        })
    }
}