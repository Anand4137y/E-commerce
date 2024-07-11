const nodemailer = require("nodemailer");


const transport = nodemailer.createTransport({
    service:'gmail',
    host:"smtp.ethereal.email",
    port:587,
    secure:false,
    auth:{
      user:'anandps848@gmail.com',
      pass:'kblhtyvvyodlyzqp'
    }
  
})



module.exports = transport