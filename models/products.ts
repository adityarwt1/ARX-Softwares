import mongoose, { Schema } from "mongoose";

export interface ProductInterface {
    title:string,
    description:string,
    url?:string,
    featured:boolean,
    badges?:string[]
}

const ProductsSchema:Schema<ProductInterface> = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    url:{
        type:String,
        required:false,
    },
    featured:{
        type:Boolean, 
        required:false,
        default:false
    },
    badges:[{
        type:String,
    }]
},{
    timestamps:true
})

const Product  = mongoose.models.Product || mongoose.model<ProductInterface>("Product", ProductsSchema)
export default Product
