import mongoose, { Schema } from "mongoose" 


export interface SessionInterfaces {
    userId:mongoose.Types.ObjectId,
    refreshToken:string,

}
const SessionSchema:Schema<SessionInterfaces> = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
    },
    refreshToken:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const Session = mongoose.models.Session || mongoose.model<SessionInterfaces>("Session", SessionSchema)
export default Session