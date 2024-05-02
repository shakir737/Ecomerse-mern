const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const authMiddleware = asyncHandler(async (req, res, next) => {
    let token ;
    if(req?.headers?.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
        try{
           console.log(token);
            if(token){
                
                
                const decoded = jwt.decode(token, process.env.JWT_SECRET);
                const user = await User.findOne(decoded._id);
                if(user){
                    
                    req.user = user;
                    
                    next();
                }
                else{
                    throw new Error("Un Authorized login attempt");
                }   
                
            }
        }catch(error){
            throw new Error("Authorized Token Expires, Please login again");
        }
    }else{
        throw new error("There is no token attached to this header");
    }
});
const isAdmin = asyncHandler(async(req, res, next) => {

 if (req.user.role !== "admin"){
    throw new Error("You are not an admin");
 }else{
    next();
 }
})
module.exports = {authMiddleware, isAdmin };