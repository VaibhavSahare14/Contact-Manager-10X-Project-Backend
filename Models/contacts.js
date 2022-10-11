const mongoose=require("mongoose");

const contactSchema=new mongoose.Schema({
  Name:{
    type:String,
    required:true
  },
  Designation:{
    type:String,
    required:true
  },
  Company:{
    type:String,
    required:true
  },
  Industry:{
    type:String,
    required:true
  },
  Email:{
    type:String,
    required:true
  },
  Phonenumber:{
    type:Number,
    unique:true,
    minlength: 10,
     maxlength: 10 ,
     required:true
  },
  Country:{
    type:String,
    required:true
  }
});

const contactsModel=new mongoose.model("contacts",contactSchema);
module.exports=contactsModel;