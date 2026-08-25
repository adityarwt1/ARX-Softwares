import mongoose, { Schema } from "mongoose";

interface DeveloperInterface {
    userId:mongoose.Types.ObjectId,
    masterPassword:string,
}

const DeveloperSchema:Schema<DeveloperInterface> = new Schema({
    userId:{
        types:Schema.Types.ObjectId,
        required:true
    }
},{
    timestamps:true
})

const Developer = mongoose.models.Admin || mongoose.model<DeveloperInterface>("Developer", DeveloperSchema)
export default Developer