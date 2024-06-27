import jwt from "jsonwebtoken"
import User from "../models/userModel.js";

export const protectRoute = async(req,res,next)=>{
    try {
        const token =req.cookies.jwt || req.headers.authorisation;
        console.log("token is found",token)
        if(!token){
            console.log("token not found")
            return res.status(401).json({
                erroe:"token not found"
                
            })
           
        }

        const decode = jwt.verify(token,process.env.JWT_SCRET);

        const user = await User.findById(decode.userId).select("-password");

        req.user =user;

        next();


    } catch (error) {
        console.log("error during middel ware protected routes")
    }
}