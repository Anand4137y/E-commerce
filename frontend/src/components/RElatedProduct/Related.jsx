import React, { useContext } from 'react'
import './Related.css'
// import data_product from '../../assets/asset/data'
import Item from '../Navbar/items/Item'
import { shopContext } from '../../context/Shopcontext'
function Related() {
  const {all_product} = useContext(shopContext)

  return (
    <div className='relatedproducts'>
        <h1>Related Products</h1>
        <hr />
        <div className="relatedproducts-item">
                {all_product.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            })}
        </div>
    </div>
  )
}

export default Related