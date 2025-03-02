import jwt from "jsonwebtoken"

const generateToken = (userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SCRET,{expiresIn:'15d'})

    res.cookie("jwt",token,{
        httpOnly:true,
        maxAge:15*24*60*60*1000 , //15 days
        // sameSite:"strict"
    })
 
     return token;
}

export default generateToken