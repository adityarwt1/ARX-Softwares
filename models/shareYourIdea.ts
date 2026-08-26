import mongoose, { Schema }  from "mongoose";

interface ShareYourIdeaInterface {
    consumerName:string,
    title:string,
    idea:string,
    images?:[string]
}

const ShareYourIdeaSchema = new Schema<ShareYourIdeaInterface>({
    consumerName:{
        type:String,
        required:true,
    },
    idea:{
        type:String,
        required:true,
    },
    images:{
        type:[String],
        required:false
    },
    title:{
        type:String,
        required:false
    }
},{
    timestamps:true
}) 


const ShareYourIdea = mongoose.models.ShareYourIdea || mongoose.model<ShareYourIdeaInterface>("ShareYourIdea", ShareYourIdeaSchema)
export default ShareYourIdea