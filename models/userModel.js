const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name!"],
        trim:true
    },
    email:{
        type:String,
        required:[true,"Please enter email"],
        unique:true,
        trim:true
    },
    role:{
        type:Number,
        default:0
    },
    avatar:{
        type:String,
        default:"https://res.cloudinary.com/dwsdwb40f/image/upload/v1610189419/samples/animals/reindeer.jpg"
    },
    password:{
        type:String,
        required:[true,"Please enter password"],
        trim:true,
    }
},{
    timestamps:true
})
module.exports=mongoose.model("Users",userSchema)