

const express= require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const authentication =(req,res,next)=>{

    const token = req.headers?.authorization?.split(" ")[1];
if(!token){

    res.send({msg:"you are not logged in..."})
}else{
    var decoded = jwt.verify(token, process.env.SECRET);
    const {user_id} = decoded;
    if(decoded){
        req.body.user_id = user_id
        next();
    }else{
        res.send({msg:"login again...token failed"})
    }
}

}


module.exports={
    authentication
}