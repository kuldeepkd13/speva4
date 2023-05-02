const express = require("express")
const axios = require("axios")
const { client } = require("../helpers/redis")
const ipRoute = express.Router()


ipRoute.post("/:ip",async(req,res)=>{
    
    try {

        const ip = req.params.ip 


        const city = await client.get(`${ip}`)

        if(city) return res.status(200).send({"msg":"data present",data:city})

        const data = await axios.get(`https://api.ipapi.com/api/161.185.160.93?access_key =${process.env.ACCESS_KEY}`)

        res.send(data)
        
    } catch (error) {
        res.send({"msg":error.message})
    }

})


module.exports={ipRoute}