const express=require('express')
const fileRoute=require('./Routes/file')
const userRoute=require('./Routes/user')
const mongoose = require('mongoose')
const dotenv = require("dotenv");
dotenv.config();
const app=express()
mongoose.connect(process.env.DATABASE_URI).then(()=>console.log("database connected successfully")).catch((err)=>console.log(err))
app.use(express.json())
app.use(fileRoute)
app.use(userRoute)
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})
app.listen(7514,console.log("server is on 7514"))