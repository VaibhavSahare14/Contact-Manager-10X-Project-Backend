const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email:{type:String,
    unique:true,
    required:true
    },
    password:{
        type:String,
        required:true,
        minlength:6, maxlength:16
    },
        confirmedPass:{
            type:String,
            required:true,
            minlength:6, maxlength:16
        }
    
})
const userModel = new mongoose.model("user",userSchema)
module.export = userModel;