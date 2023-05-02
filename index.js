const express = require("express");
const {connection} = require("./config/db")
const {userRoute} = require("./routes/user.route");
const { auth } = require("./middleware/auth");
const { logger } = require("./middleware/logger");
const { ipRoute } = require("./routes/ip.route");
const app = express()

app.use(express.json())

app.use("/user", userRoute)

app.use("/ip",auth,ipRoute)


app.listen(4500,async()=>{
    try {
        await connection
        console.log("connected to mongodb")
       logger.log("info","connected")
    } catch (error) {
        logger.log("error","disconnected")
        console.log(error)
        console.log("Not connected to mongodb")
    }
    console.log("server is running")
})