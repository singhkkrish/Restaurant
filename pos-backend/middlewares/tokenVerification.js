const jwt=require('jsonwebtoken');
const config=require('../config/config');
const createHttpError=require('http-errors');
const User=require('../models/userModel');
const isVerifiedUser=async(req,res,next)=>{
    try{
        const {accessToken}=req.cookies;
        if(!accessToken){
            const error= createHttpError(401,"Please provide token!");
            return next(error); 
        }
        const decodeToken= jwt.verify(accessToken,config.accessTokenSecret);
        const user= await User.findById(decodeToken.id);
        if(!user){
            const error= createHttpError(401,"User not exist!");
            return next(error);           
        }
        req.user=user;
        next();
    }catch(error){
        const err =createHttpError(401,"Invalid token!");
        next(err);
    }
}
module.exports={isVerifiedUser};