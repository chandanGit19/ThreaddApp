import mongoose from "mongoose";

const userShema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    username:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        minLength:6,
        require:true,
    },
    password: {
        type: String,
        minLength: 6,
        required: true,
    },
    profilePic:{
        type:String,
        default:"",
    },
    followers:{
        type:[String],
        default:[]
    },
    following:{
        type:[String],
        default:[]
    },
    bio:{
        type:String,
        default:""
    }

},{
    timestamps:true,
})

const User = mongoose.model("User",userShema);
export default User;