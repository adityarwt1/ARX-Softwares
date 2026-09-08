"use server"
import { cookies } from "next/headers"
export const saveToCookies = async (token:string) => (await cookies()).set(process.env.COOKIE_NAME as string, token, {
    httpOnly:true,
    path:"/",
    sameSite:"strict",
    priority:"high"
})