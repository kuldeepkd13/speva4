const winston = require("winston")

require("dotenv").config

const {MongoDB}= require("winston-mongodb")

const logger = winston.createLogger({
    level:"info",
    format:winston.format.json(),
    transports:[
        new MongoDB({
            db:process.env.mongoUrl,
            collection:"logs",
            options:{
                useUnifiedTopology:true
            }
        })
    ]
})

module.exports={logger}