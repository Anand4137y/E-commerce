const express =require('express')
const jwt = require('jsonwebtoken')
const verifyotp = require('../models/otpemailmodel')
const transport = require('../common/mailer')
const Users = require('../models/usermodel')

const router = express.Router()


//  Api for sending otp
router.post('/otpsend',async(req,res)=>{
    
     try {
        const{email}=req.body
        
        const finduser = await verifyotp.findOne({email}) 
        const findUser = await Users.findOne({email})
        
        if(!finduser && !findUser){
            let min = 1000
        let max = 9999
        const otp = parseInt(Math.random() * (max-min +1) + min)
        const mailoption = {
         to:email,
         subject:"Otp for Registration",
         text:`Your otp for registration for E-Commerce website is ${otp}`, 
        }
        const newverify = new verifyotp({email,otp})
        //   save mail,otp  && send otp to mail
        await newverify.save().then(()=>{
           transport.sendMail(mailoption,function(error,success){
            if(error){
               console.log(error); 
            }else{
              console.log("mail sended");
            }
           })
         })

         res.status(201).json({success:"sucess","otp":otp})
        }else{
          return res.send("email already exist")
        }
        
      
        
       
        
     } catch (error) {
        res.status(401).json({message:error})
     }
    
})



  //     creating API for signup the user 
  router.post('/signup',async(req,res)=>{ 
   let check = await Users.findOne({email:req.body.email})
   if(check){
     return res.status(400).json({success:false,errors:"existing user found"})
   }
   let cart = {}
   for(i=0;i<300;i++){
     cart[i]=0
   }
   const user = new Users({
     name:req.body.username,  
     email:req.body.email,
     password:req.body.password,
     cartData:cart,
   })
   await user.save()
   .then((res)=>{
     const mailoption = {
       to:req.body.email,
       subject:"Registration",
       text:"Your Account created on Shopper ecommerce has Successfully Completed",
       html:'<h1>Success</h1>'
      }
      //            sending mail to the registerd mail id
     transport.sendMail(mailoption,function(error,success){
       if(error){
         console.log(error);
       }else{
         console.log("Mail sent to the registered email",success);
       }
     })
   }).catch((err)=>console.log(err))
   

   const data = {
     user:{
       id:user.id,
       email:user.email
     }
   }
   const token = jwt.sign(data,'sercet_ecom');
   res.json({success:true,token})
}) 


 








module.exports=router