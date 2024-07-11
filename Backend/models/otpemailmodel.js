const mongoose = require('mongoose')

const otpSchema = new mongoose.Schema({
    email:{
        type:String
    },
    otp:{
        type:Number
    }
},{
    timestamps:true
})

const verifyotp = new mongoose.model("otpverify",otpSchema)

module.exports = verifyotp