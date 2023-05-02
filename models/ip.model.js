const mongoose = require("mongoose")


const citySchema = mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId ,ref:"user"},
    ip:{type :String , required:true},
})


const CityModel = mongoose.model("City",citySchema)

module.exports={CityModel}