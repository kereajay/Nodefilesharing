const Fileschema=require('../Model/file')
const Userschema=require('../Model/user')
const multer=require('multer')
const { v4: uuidv4 } = require('uuid');
const path=require('path')
const fileuploads='uploads'
const storage=multer.diskStorage({
    destination:(req,file,cb)=>cb(null,fileuploads),
    filename:(req,file,cb)=>{
        let filename=uuidv4()+path.extname(file.originalname);
        cb(null,filename)
    }
})
const finalupload=multer({
    storage:storage,
    limits:{
        fileSize:20*1024*1024//20 MB is the limit of file
    }
}).single("namefile")

const upload=(req,res)=>{
    // console.log(req.body)
    finalupload(req,res,async()=>{
       
      
      
        const filedata={
            originalname:req.file.originalname,
            newname:req.file.filename,
            size:req.file.size
        }
        Fileschema.create(filedata)
        const user=await Fileschema.findOne({newname:req.file.filename})
        console.log(user)

        res.json({success:true,message:"file uploaded successfully",fileId:user._id})
    
    })



}

const getthelink=(req,res)=>{
    console.log(req.params.fileId)
    res.json({success:true,message:"share this link",link:`/file/download/${req.params.fileId}`})
    
}
const downloadfile=async(req,res)=>{
   console.log(req.params.fileId)
   const filedata=await Fileschema.findById(req.params.fileId)
//    console.log(filedata)
   const dpath=`uploads/${filedata.newname}`
   res.download(dpath,filedata.originalname)
    
}
const Filecontroller={
    getthelink,
    upload,
    downloadfile,
}
module.exports=Filecontroller