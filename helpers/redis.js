const redis = require("ioredis")

require("dotenv").config


let configuration = {
    host:"redis-12401.c212.ap-south-1-1.ec2.cloud.redislabs.com",
    port:12401,
    username:"default",
    password:process.env.password
}

const client = new redis(configuration);


client.on("connect",()=>{
 console.log("connected to redis");
})

client.on("error",()=>{
    console.log("not connected to redis");
})

module.exports={client}