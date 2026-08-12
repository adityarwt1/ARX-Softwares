import mongoose from "mongoose";

interface Visitors {
    visits:number,
}

const VisitorsSchema:mongoose.Schema<Visitors> = new mongoose.Schema({
    visits:{
        type:Number,
        default:0,
        required:false
    }
},{
    timestamps:true
})

const Visitors = mongoose.models.Visitors || mongoose.model<Visitors>("Visitors", VisitorsSchema)
export default Visitors