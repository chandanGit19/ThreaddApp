import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import generateToken from "../utils/generateTokrn.js";
// import { response } from "express";
import {v2 as cloudinary} from 'cloudinary'



export const signupUser = async(req,res)=>{
    try {
        const {name ,email,username,password}=req.body;

        if(!name || !email || !username || !password){
            return res.status(400).json({
                error:"all fields are require"
            })
        }


        const user = await User.findOne({$or:[{email},{username}]});

        if(user){
            return res.status(400).json({
                error:"User already exist",
                success:false,
            })
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = new User({
            name,
            username,
            email,
            password:hashedPassword
        })

        await newUser.save();

        if(newUser){

           const token = generateToken(newUser._id,res)

            res.status(201).json({
                _id:newUser._id,
                name:newUser.name,
                username:newUser.username,
                email:newUser.email,
                profilePic:newUser.profilePic,
                bio:newUser.bio,
                token:token
            })
        }else{
            res.status(400).json({
                error: "invalid json data"
            })
        }


        
    } catch (error) {
        res.status(500).json({
            error:"err in creating signupUser data"
        })
        console.log("error in signupUser")
        
    }

}

 export const loginUser = async(req,res)=>{

    try {
        
        const {username,password} =req.body;

        const user = await User.findOne({username})

        if(!user){
           return res.status(201).json({
            error:"user not found "
            })
        }
        const isPasswordCorrect = await bcrypt.compare(password,user.password);

        if(!isPasswordCorrect){
            return res.status(400).json({
                error:"invalid password"
            })
        }
        const token = generateToken(user._id,res)

        res.status(200).json({
            message:"login successful",
            _id:user._id,
            name:user.name,
            email:user.email,
            username:user.username,
            profilePic:user.profilePic,
            bio:user.bio,
            token:token

        })



    } catch (error) {
        console.log("error in the loginUser")
        res.status(500).json({
            error:`"error in " ,${error.message}`
        })
    }

}

export const logoutUser = (req,res)=>{
try {
    res.cookie("jwt","",{
        maxAge:1
    }).status(200).json({
        message:"log out successfuly"
    })
    
} catch (error) {
    console.log("error in the logout")
        res.status(500).json({
            error:`"error in logout" ,${error.message}`
        })
    
}
}


export const followUnfollow = async(req,res)=>{

    try {
        const {id}=req.params;

        // console.log("id is found ",id,"user is find",req.user._id)

        const userToModify = await User.findById(id);
        // console.log("usertoModofy",userToModify);

        const currentUser = await User.findById(req.user._id);
        // console.log("currentuser",currentUser)

        if(id == req.user._id.toString()){
            return res.status(400).json({
                error:"you canot follow/unfollow yourself"
            })
        }

        if(!userToModify || !currentUser){
            return res.status(400).json({
                error:"user not found"
            })
        }
        
        // const idd = id.toString();
        // console.log("idd is ",idd)
        const isFollowing = currentUser.following.includes(id);
        // console.log("isfollowing or not",isFollowing)
        // following and unfollowing
        if(isFollowing){
             await User.findByIdAndUpdate(req.user._id,{
                $pull :{following:id}
             })
             await User.findByIdAndUpdate(id,{$pull:{followers:req.user._id}});

             res.status(200).json({
                message:"user unfollow successfuly"
             })
        }else{
            await User.findByIdAndUpdate(req.user._id,{
                $push :{following:id}
             })
             await User.findByIdAndUpdate(id,{$push:{followers:req.user._id}});
             res.status(200).json({
                message:"user follow successfuly"
             })

        }



    } catch (error) {
        console.log("follow and unfollow the user",error.message)
        
    }

}

export const updateUsers = async(req,res)=>{

    const {name,email,username,password,bio} = req.body;
    let {profilePic} = req.body;
    console.log("profilepic to backend",profilePic)
    const userId = req.user._id;
    // const userId = req.params.id;

    try {
        let user = await User.findById(userId);
        if(!user){
            return res.status(401).json({
                error:"user not found unable to update"
            })
        }

        // if(req.params.id !== userId.toString()){
        //     return res.status(400).json({
        //         error:"you can't update someone else profile"
        //     })
        // }

        if(password){
            const salt =await bcrypt.salt(10);
            const hashedPassword = await bcrypt.hash(password,salt);
            user.password=hashedPassword;
        }

        if(profilePic){
            if(user.profilePic){
                await cloudinary.uploader.destroy(user.profilePic.split('/').pop().split('.')[0]);
            }
            const uploadResponse = await cloudinary.uploader.upload(profilePic);
            profilePic = uploadResponse.secure_url
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.username = username || user.username;
        user.profilePic = profilePic || user.profilePic;
        user.bio = bio || user.bio;

         user=await user.save()
         user.password=null;

         res.status(200).json({
            message:"updated succesfuly",
            user
         })

        
    } catch (error) {
        console.log("error during the updating the user");
        return res.status(400).json({
            error:"can't update the profile"
        })
    }
}

export const getUserProfile = async(req,res)=>{
    const {username} = req.params;

    try {
        const user =  await User.findOne({username}).select("-password").select("-updatedAt");

    if(!user){
        return res.status(401).json({
            error:"user not found "
        })
    }

    res.status(200).json({
        message:"user found",
        user
    })
        
    } catch (error) {
        console.log("error in fetching profile");
        return res.status(401).json({
            error:"can't find the profile"
        })
    }
}