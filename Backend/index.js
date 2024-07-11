const port = 4000;
const express = require('express')
const app = express()   // creating instance of express
const Users = require('./models/usermodel')
const Product = require('./models/productmodel')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const path = require('path')
const cors = require('cors'); //  provide access to react project
const { type } = require('os');
const transport = require('./common/mailer')
const routetopayment  = require('./routes/routes')
const verifyrouter = require('./routes/VerifyOtp')
require('./common/mongodb')
app.use(express.json()); //req passed are automatically passed to json
app.use(cors())  
app.use(express.urlencoded({extended:true}))









// image storage engine

const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({storage:storage})
 
// creating upload Endpoint for images
app.use('/images',express.static('upload/images'))
app.post('/upload', upload.single('product'), (req, res) => {
    if (!req.file) { 
        return res.status(400).json({ success: 0, message: 'No file uploaded' });
    }
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});
 


  //      creating api for deleting product

  app.post('/addproduct',async (req,res)=>{
    let products = await Product.find({})
    let id;
    if(products.length>0){
      let last_product_array = products.slice(-1);
      let last_product = last_product_array[0]
      id = last_product.id + 1
    }
    else{
      id =1
    }
    const product = new Product({
      id:id,
      name:req.body.name,
      image:req.body.image,
      category:req.body.category,
      new_price:req.body.new_price,
      old_price:req.body.old_price,
    })
    console.log(product);
    await product.save();
    console.log("saved");
    res.json({
      success:true,
      name:req.body.name
    })
  })

  // creating API for deleting
  app.post('/removeproduct',async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id})
    console.log("removed");
    res.json({
      success : true,
      name:req.body.name
    })
  })

  // creating api for getting all products
  app.get('/allproducts',async (req,res)=>{
     let products = await Product.find({})
     console.log("All Products fectched");
     res.send(products)
  })

  

  //     Creating Api for user login

  app.post('/login',async(req,res)=>{
    
    let user = await Users.findOne({email:req.body.email})
    if(user){
      const passcompare = req.body.password === user.password;
      if(passcompare){
        const data = {
          user:{
            id:user.id,
            email:user.email
          }
        }
        const token = jwt.sign(data,'secret_ecom')
        res.json({success:true,token})
      }else{
        res.json({success:false,error:"Wrong Password"})
      }

    }else{
      res.json({success:false,errors:"Wrong email Id"})
    } 
  })
      
  //      creating api for new collection
  app.get('/newcollections',async(req,res)=>{
    let products = await Product.find({})
    let newcollection = products.slice(1).slice(-8);
    // console.log('new collection fetched');
    res.send(newcollection);
  })
//      creating api for popular in women
app.get('/popularinwomen',async(req,res)=>{
  let products = await Product.find({category:"women"});
  let popular_in_women = products.slice(0,4);
  // console.log("popular in woman fetched");
  res.send(popular_in_women)
})

//  creating middleware to fetch user
    const fetchUser = async (req,res,next)=>{
      const token = req.header('auth-token');
      if(!token){
        res.status(401).send({errors:"Please authenticate using valid token"})
      }else{
        try{
          const data = jwt.verify(token,'secret_ecom');
          req.user = data.user
          next()
        }catch(error){
          res.status(401).send({errors:"Please authenticate using a valid token"})
        }
      }
    }  

//creating api for adding product to cart



app.post('/addtocart',fetchUser, async (req, res) => {
  
  let userData = await Users.findOne({_id:req.user.id})
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
  res.send("Added")
  
});

//creating api for removing product from cart
app.post('/removefromcart',fetchUser,async(req,res)=>{
  ;
  let userData = await Users.findOne({_id:req.user.id})
  if(userData.cartData[req.body.itemId]>0)
  userData.cartData[req.body.itemId] -= 1;
  await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
  res.send("Removed")
})


//    Creating Api for reteieving cart data
app.post('/getcart',fetchUser,async(req,res)=>{
  
  let userData = await Users.findOne({_id:req.user.id})
  res.json(userData.cartData)
})







app.use('/otp',verifyrouter)
app.use('/payment',routetopayment)
app.listen(port,(error)=>{
    if(!error){
        console.log("server running on ",port);
    }else{
        console.log("error : ",error);
    }
})
















