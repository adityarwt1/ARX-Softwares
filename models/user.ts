import mongoose, { Schema } from "mongoose";
export interface UserInterface {
    fullName: string,
    email: string
    password: string,
    profilePicture?: string
    isDeveloper: boolean
    isAdmin: boolean
    isConsumer: boolean
    createdAt?: Date,
    updatedAt?: Date
}

const UserSchema:Schema<UserInterface> = new Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        index:true
    },
    isAdmin:{
        type:Boolean,
        required:false,
    },
    isConsumer:{
        type:Boolean,
        required:false,
    },
    isDeveloper:{
        type:Boolean,
        required:false,
    },
    password:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String,
        required:false,
        default:'/defaultProfilePicture.png'
    }
},{
    timestamps:true
})

const User = mongoose.models.User || mongoose.model<UserInterface>("User", UserSchema)
export default User