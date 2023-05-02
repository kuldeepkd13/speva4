const express= require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { UserModel } = require("../models/user.model")
const { client } = require("../helpers/redis")
const { auth } = require("../middleware/auth")

const userRoute  = express.Router()


userRoute.post("/register",async(req,res)=>{
    const {name,email,password,city} = req.body
    try {
        const user  = await UserModel.findOne({email})

        if(user) return res.status(400).send({"msg":"User already present"});

        const hash = await bcrypt.hash(password,8);

        const newuser = new UserModel({name,email,password : hash,city})

        await newuser.save()

        res.status(200).send({"msg":"register"})

    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})


userRoute.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
        const user  = await UserModel.findOne({email})

        if(!user) return res.status(400).send({"msg":"User not  present register"}); 
       
        const ispassword = await bcrypt.compare(password,user.password)

        if(!ispassword) return res.status(400).send({"msg":"wrong password"}); 

        const token = await jwt.sign({userId:user._id,city:user.city},"name",{expiresIn:"1h"})

        res.status(200).send({"msg":"login success",token:token})

    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})


userRoute.get("/logout",auth,async(req,res)=>{

    try {
        const token = req.headers?.authorization?.split(" ")[1];

        if(!token) return res.status(400).send({"msg":"provide token"});

        await client.set(token,token);

        res.send("logout Success")

    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})




module.exports={userRoute}