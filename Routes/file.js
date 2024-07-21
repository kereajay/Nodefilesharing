const epxress=require('express')
const userAuth=require('../Middleware/userAuth')
const Filecontroller=require('../Controller/file')
const fileRoute=epxress.Router();
fileRoute.post('/upload',userAuth,Filecontroller.upload)
fileRoute.get('/file/:fileId',userAuth,Filecontroller.getthelink)
fileRoute.get('/file/download/:fileId',Filecontroller.downloadfile)
module.exports=fileRoute