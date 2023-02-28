const mongoose=require("mongoose")

const Contacts=new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    phone:Number
})
const ConModel= new mongoose.model("contactss",Contacts)

module.exports=ConModel