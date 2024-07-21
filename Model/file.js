const mongoose=require('mongoose')
const fileschema=new mongoose.Schema({
    originalname:{
        type:String
    },
    newname:{
        type:String
    },
    size:{
        type:Number
    }
})
const Fileschema=mongoose.model("filesharing",fileschema)
module.exports=Fileschema