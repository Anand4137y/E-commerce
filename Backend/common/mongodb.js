const mongoose = require('mongoose')

// Database connection with mongoDB
mongooseConnect()
async function mongooseConnect(){
  await mongoose.connect("mongodb+srv://anandps1321:U7h5tNKue5OA1phM@cluster0.jp2clmy.mongodb.net/e-commerce")
  .then((res)=>console.log("database connected"))
  .catch((err)=>console.log(err))
}
