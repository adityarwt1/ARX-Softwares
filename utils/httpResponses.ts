"use server"

import { HTTP_STATUS_CODE } from "@/enums/httpRequest/statusCode"
import { HTTP_Response } from "@/interfaces/httpResponse/httpServerResponse"
import { NextResponse } from "next/server"

interface InternalServerIssueProps {
    errorMessage:string 
}
interface BadrequestProps{
    errorMessage:string
}
export  const internalServerIssue = async <T>({errorMessage}:InternalServerIssueProps)=> NextResponse.json<HTTP_Response<T>>({
    success:false,
    error:{
        message:errorMessage,
        status_code:HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
    }
},{
    status:HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
})

export const badRequest  = async ({errorMessage}:BadrequestProps) => NextResponse.json<HTTP_Response>({
    success:false,
    error:{
        message:errorMessage,
        status_code:HTTP_STATUS_CODE.BAD_REQUEST
    }
},{
    status:HTTP_STATUS_CODE.BAD_REQUEST
})
export const conflict  = async ({errorMessage}:BadrequestProps) => NextResponse.json<HTTP_Response>({
    success:false,
    error:{
        message:errorMessage,
        status_code:HTTP_STATUS_CODE.CONFLICT
    }
},{
    status:HTTP_STATUS_CODE.CONFLICT
})

export const resultantResponse = async <T>({
    data
}: {
    data?: T
}) =>
    NextResponse.json<HTTP_Response<T>>({
        success: true,
        data,
        success_message: "Done Successfully!"
    },{
        status:HTTP_STATUS_CODE.OK
    });