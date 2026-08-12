import mongoose from "mongoose";

const dbConnect = async () : Promise<boolean>=> {
    try {
        const isConnected = mongoose.connection.readyState == 1;
        if(isConnected) return true
        const isConnectFresh = await mongoose.connect(process.env.MONGODB_URI as string,{
            dbName:"ARX-SOFTWARES"
        })
        if(isConnectFresh) return true
        else return false
    } catch (error) {
        return false
    }
}

export default dbConnect