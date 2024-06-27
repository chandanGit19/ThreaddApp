import mongoose from "mongoose";

const postschema = new mongoose.Schema({
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    text:{
        type:String,
        maxLength:500,      
    },
    img:{
        type:String,
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    replies:[
        {
            userId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
                require:true
            },
            text:{
                type:String,
                require:true,
            },
            userProfilePic:{
                type:String
            },
            username:{
                type:String,
            }
        }
    ]
},{
    timestamps:true,
})

export default mongoose.model("Post",postschema);