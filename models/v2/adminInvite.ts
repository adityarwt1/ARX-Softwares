import mongoose, { Schema } from "mongoose";

interface AdminInviteInterafce {
    invitedByUserId:mongoose.Types.ObjectId,
    email:string,
    valiDateAndTime:Date
}

const AdminInviteSchema :Schema<AdminInviteInterafce> = new Schema({
    invitedByUserId:{
        type:Schema.Types.ObjectId,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    valiDateAndTime:{
        type:Date,
        required:true
    }
},{
    timestamps:true
})

const AdminInvite = mongoose.models.AdminInvite || mongoose.model<AdminInviteInterafce>("AdminInvite", AdminInviteSchema)
export default AdminInvite