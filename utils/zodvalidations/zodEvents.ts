"use server"

import { ZodSafeParseError } from "zod"


export const getErrorMessageOfZodValidatoins = async (zodValidation:ZodSafeParseError<unknown>) : Promise<string>=>{
    const { message } = JSON.parse(zodValidation.error.message)[0]
    if(message) return message
    else return ""
}