import express from "express";
const app = express();
import dotenv from 'dotenv';
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from './routes/userRoutes.js'
import postRoutes from "./routes/postRoutes.js"
import cors from 'cors'
import connectCloudinary from "./utils/cloudinaryconnect.js";
dotenv.config();
connectDB();

const PORT = process.env.PORT || 4000

app.use(express.json({
    limit:'30mb',
    parameterLimit:100000
}));//to parse json data when we send from from fron end to  the backend and from backend to frontend
app.use(express.urlencoded({extended:true,parameterLimit:100000,limit:'30mb'}));//to parse the form data in then req.body extend true means theat nested form data also get parse
app.use(cookieParser());//it allows us to parse the cokies from req body and header 

const coresOptions ={
    origin:true,
    credentials:true,
};
app.use(cors(coresOptions))
connectCloudinary();

app.use("/api/users",userRoutes)
app.use("/api/posts",postRoutes)

app.listen(PORT,()=>{
    console.log(`app is listing ${PORT}`)
})
