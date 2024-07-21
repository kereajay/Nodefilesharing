const mongoose=require('mongoose')
const userschema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    Firstname:{
        type:String,
        required:true
        
    },
    lastname:{
        type:String,
        default:"-"
    }


})

const Userschema=mongoose.model('userfile',userschema)
module.exports=Userschema