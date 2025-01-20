
import React, { useContext } from 'react'
import './cartitem.css'
import { shopContext } from '../../context/Shopcontext'
import remove_icon from'../../assets/asset/cart_cross_icon.png'

import { ToastContainer, toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Button} from 'react-bootstrap'

function Cartitem() {
    const {getTotalAmount,all_product,cartItem,removeFromCart}=useContext(shopContext)

    const handlePayment = async () => {
        const response = await fetch('http://localhost:4000/payment/createOrder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            amount: getTotalAmount() * 100, // Amount in paisa (e.g., ₹10.00)
            email:localStorage.getItem("auth-token")
          })
        });

        const order = await response.json();
        const{amount,currency,id}=order
        const options = {
          key: 'rzp_test_2FhnJW52BLGsvh',
          amount: amount,
          currency: currency,
          name: 'SHOPPER',
          description: 'Test Payment',
          order_id: id,
          handler: function (response) {
            console.log(response);
            toast.info(response.razorpay_payment_id,
              {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Bounce,});
            
            
            
            // Call backend to capture payment with response.razorpay_payment_id and amount
          },
          prefill: {
            name: 'Anand',
            email: 'Anandps@example.com',
            contact: '9999999999'
          }
        };
        const rzp = new window.Razorpay(options);
        
        rzp.open();
      };

  return (
    <div className='cartitems'>
        <div className="cartitems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr />
        {all_product.map((e)=>{
            if(cartItem[e.id]>0){
                return <div>
                <div className="cartitems-format cartitems-format-main">
                 <img src={e.image} alt="" className='carticon-product-icon' />
                 <p>{e.name}</p>
                 <p>₹{e.new_price}</p>
                 <button className='cartitems-quantity'>{cartItem[e.id]}</button>
                 <p>₹{e.new_price*cartItem[e.id]}</p>
                 <img className='cartitems-remove-icon' src={remove_icon}onClick={()=>{removeFromCart(e.id)}} alt="" />
                 </div> 
                 <hr />
             </div>
            }
            return null;
        })}
        <div className="cartitems-down">
            <div className="cartitems-total">
                <h1>Cart totals</h1>
                <div>
                    <div className="cartitems-total-item">
                        <p>SubTotal</p>
                        <p>₹{getTotalAmount()}</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <p>Shipping Free</p>
                        <p>Free</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <h3>Total</h3>
                        <h3>₹{getTotalAmount()}</h3>
                    </div>
                </div>
                <Button variant='danger' onClick={handlePayment}>PROCEED TO CHECKOUT</Button>
            </div>
            <div className="cartitems-promocode">
                <p>If you have a promo code ,Enter it here</p>
                <div className="cartitems-promobox">
                <input type="text" placeholder='promo code' />
                <Button variant='dark'>Submit</Button>
                
                </div>
            </div>
        </div>
        <ToastContainer position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored" />
    </div>
   
  )
}
 export default Cartitem