import React, { useContext } from 'react'
import './Productdisplay.css'
import start_icon from '../../assets/asset/star_icon.png'
import start_dull_icon from '../../assets/asset/star_dull_icon.png'
import { shopContext } from '../../context/Shopcontext'
import {Button} from 'react-bootstrap'
function Productdisplay(props) {
    const {product} = props
    const {addToCart} = useContext(shopContext)
  return (
    <div className='productdisplay'>
        <div className="productdisplay-left">
            <div className="productdisplay-img-list">
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
            </div>
            <div className="productdisplay-img">
                <img className='productdisplay-main-img' src={product.image} alt="" />
            </div>

        </div>
        <div className="productdisplay-right">
            <h1>{product.name}</h1>
            <div className="productdisplay-right-stars">
                <img src={start_icon} alt="" />
                <img src={start_icon} alt="" />
                <img src={start_icon} alt="" />
                <img src={start_icon} alt="" />
                <img src={start_dull_icon} alt="" />
                <p>(122)</p>
            </div>
            <div className="productdisplay-right-prices">
                <div className="productdisplay-right-price-old">₹{product.old_price}</div>
                <div className="productdisplay-right-price-new">₹{product.new_price}</div>
            </div>
            <div className="productdisplay-right-description">
                A Lightweight,usually knitted,pullover shirt,close-fitting and round neckline and short sleeves, worm as an undershirt or outer garment.
            </div>
            <div className="productdisplay-right-size">
                <h1>select size</h1>
                <div className="productdisplay-right-size">
                    <div>S</div>
                    <div>M</div>
                    <div>L</div>
                    <div>XL</div>
                    <div>XXL</div>
                </div>
            </div>
            <Button variant='danger' onClick={()=>{addToCart(product.id)}}>ADD TO CART</Button>
            <p className='productdisplay-right-category'><span>Category :</span>Women , T-Shirt, Crop Top</p>
            <p className='productdisplay-right-category'><span>Tags :</span>Modern , Latest</p>
        </div>
    </div>
  )
}

export default Productdisplay