import mongoose from "mongoose";
const connectDB = async()=>{
    try {
        const con =await mongoose.connect(process.env.MONOGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log("Db connected successfully")
    } catch (error) {
        console.log("erroe in connection of Db");
        process.exit(1);
        
    }
}
export default connectDB;