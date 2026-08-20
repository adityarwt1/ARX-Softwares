import mongoose, { Schema } from "mongoose";

export interface UserSchemaInterface {
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    profilePicture?:string,
    isAdmin?:boolean,
    isDeveloper?:boolean,
}

const UserSchema:Schema<UserSchemaInterface> = new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String,
        required:false,
        default:"/defaultUserProfile.png"
    },
    isAdmin:{
        type:Boolean,
        required:false,
    },
    isDeveloper:{
        type:Boolean,
        required:false,
    }
},{
    timestamps:true
})

const User = mongoose.models.User || mongoose.model<UserSchemaInterface>("User", UserSchema)
export default User