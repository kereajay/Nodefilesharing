const Userschema = require("../Model/user");
const jwt = require("jsonwebtoken");
const userAuth = (req, res, next) => {
  try {
    //checking wheathet token is present or not
    const bearertoken = req.headers.authorization;
    if (!bearertoken) {
      return res.status(401).json({
        success: true,
        message: "there is no token availabel",
      });
    }

    //matching token or verifying the token
    const token = bearertoken.split(" ")[1];
    jwt.verify(token, "filesharing");

    //checkinh token expiry time

    const tokendata = jwt.decode(token);
    const currenttimeinsec = Math.floor(new Date().getTime() / 1000);
    if (currenttimeinsec > tokendata.exp) {
      return res.status(401).json({ success: false, message: "your token is expired" });
    }

    //checking wheather user is present or not

    const isuser=Userschema.findById(tokendata.userId)
    if(!isuser){
      return  res.status(401).json({success:false,message:"there is no such user"})
    }
  } catch (err) {
    return res.status(401).json({ success: false, message: "error from catch", err: err });
  }
  next()
};
module.exports = userAuth;
