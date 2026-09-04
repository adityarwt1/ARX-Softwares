"use server"

import Session from "@/models/session";
import mongoose from "mongoose";

interface GetSessionIdToUserReturnInterface{
    userId:string | mongoose.Types.ObjectId
}
export async function getSessionIdToUserId(sessionId:string | mongoose.Types.ObjectId) : Promise<GetSessionIdToUserReturnInterface | null>{ 
    try {
        /// check 
        const session = await Session.findOne({
            _id:sessionId
        }).lean().select("userId")
        // if session not found
        if(!session) return null
        else return session.userId
    } catch (error) {
        console.log((error as Error).message)
        return null
    }
}


