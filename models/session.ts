import mongoose, { Schema } from "mongoose";

interface SessionInterface {
    userId:mongoose.Types.ObjectId,
    exp:Date | number,
    isAdmin?:boolean,
    isDeveloper?:boolean,
    isConsumer?:boolean
}

const SessionSchema = new Schema<SessionInterface>({
    userId:{
        type:Schema.Types.ObjectId,
        required:true
    },
    exp:{
        type:Date || Number,
        required:true
    },
    isAdmin:{
        type:Boolean,
        required:false
    },
    isDeveloper:{
        type:Boolean,
        required:false
    },
    isConsumer:{
        type:Boolean,
        required:false
    }
},{
    timestamps:true
})

const Session = mongoose.models.Session || mongoose.model<SessionInterface>("Session", SessionSchema)
export default Session