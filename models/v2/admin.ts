import mongoose, { Schema } from "mongoose";

interface AdminInterface {
    userId:mongoose.Types.ObjectId,
    masterPassword:string,
    
}

const AdminSchema:Schema<AdminInterface> = new Schema({
    userId:{
        types:Schema.Types.ObjectId,
        required:true
    },
    masterPassword:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const Admin = mongoose.models.Admin || mongoose.model<AdminInterface>("Admin", AdminSchema)
export default Admin