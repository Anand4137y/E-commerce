const express = require('express')
const router = express.Router()
const transport = require('../common/mailer')
const Razorpay = require('razorpay');


const razorpay = new Razorpay({
  key_id: 'rzp_test_2FhnJW52BLGsvh',
  key_secret: 'wKdo3wzKKFUwjuHzOAdsxfAe'
});

router.post( "/createOrder",async (req, res) => {
    console.log(req.body);
    const amount = req.body.amount; // Amount in paisa (e.g., ₹10.00)
    const currency = 'INR';
  
    const options = {
      amount: amount,
      currency: currency,
      receipt: 'order_rcptid_11'
    };
  
    razorpay.orders.create(options, (err, order) => {
      //   sending mail after payment 
      const mailoption = {
        to:"anandps1321@gmail.com",
        subject:"Payment for Product",
        html:`<h1>Order success</h1>  here is your order id:${ order.id} `,
        text:`Order for you payment was successfull `,
      }
      
      if (err) {
        // console.error(err);
        res.status(500).json({ error: 'Failed to create order' });
      } else {
        transport.sendMail(mailoption, function(err,success){
          if(err){
            console.log(err); 
          }else{
            console.log(success);
          }
        })
        
        res.json(order); 
      }
    });

  });

 


module.exports = router