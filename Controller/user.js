const Userschema=require('../Model/user')
const jwt=require('jsonwebtoken')
const signup=(req,res)=>{
    console.log(req.body)
    Userschema.create(req.body)
    res.json({success:true,message:req.body})
    
}
const signin=async(req,res)=>{
    // console.log(req.body)
    const user=await Userschema.findOne({email:req.body.email})
    const currnttimeinseconds=Math.floor(new Date().getTime()/1000)
    const expirytime=currnttimeinseconds+3600;
    const jwtpayload={
        userId:user._id,
        email:user.email,
        exp:expirytime

    }
    const token=jwt.sign(jwtpayload,"filesharing")
    await Userschema.findByIdAndUpdate(user._id,{$set:{token:token}})
    if(!user){
        res.status(400).json({success:false,message:"you are not a user"})
    }
    if(req.body.password!==user.password){
        res.status(400).json({success:false,message:"Incorrect password"})

    }
    console.log()
    res.json({success:true,message:"login success full",token:token})

}
const userController={
    signup,
    signin,
}
module.exports=userController