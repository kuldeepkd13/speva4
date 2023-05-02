const jwt = require("jsonwebtoken");
const { client } = require("../helpers/redis");

const auth = async (req,res,next)=>{

    try {
        
        const token = req.headers?.authorization?.split(" ")[1];

        if(!token) return res.status(400).send({"msg":"login again"})


        const decodedtoken = await jwt.verify(token,"name")

    
        const blacklistedtoken = await client.get(token)

        if(token===blacklistedtoken) return res.status(400).send({"msg":"unauthorized"})

        next()

    } catch (error) {
        res.status(400).send({"msg":error.message})
    }

}

module.exports={auth}