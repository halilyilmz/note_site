import mongoose from "mongoose";

const MONGODB_URI:string |undefined=process.env.MONGODB_URI
if(!MONGODB_URI){
    throw new Error("mongodb uri not defined")
}




const connect =async()=>{
    const connectionsSate=mongoose.connection.readyState;

    if(connectionsSate===1){
        console.log("allready connected")
        return;
    }

    if(connectionsSate===2){
        console.log("conecting...")
        return;
    }

    try{
        await mongoose.connect(MONGODB_URI,{
            dbName:"next1restapi",
            serverSelectionTimeoutMS: 5000,
        });
        console.log("connected");
    }
    catch (err:any){
        console.log("connectin err: ",err)
        throw new Error("error: ",err);

    }
};

export default connect;