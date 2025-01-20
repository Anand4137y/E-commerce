  import React, { useContext } from 'react'
import { shopContext } from '../context/Shopcontext'
import { useParams } from 'react-router-dom'
import Breadcrump from '../components/Breadcrumps/Breadcrump'
import Productdisplay from '../components/Productdisplay/Productdisplay'
import Description from '../components/Descriptionbox/Description'
import Related from '../components/RElatedProduct/Related'

function Product() {
  const {all_product} = useContext(shopContext)
  const {productId} = useParams()
  const product = all_product.find((e)=>e.id === Number(productId))
  return (
    <div>
      <Breadcrump product={product} />
      <Productdisplay product={product}/>
      <Description/>
      <Related/>
      
    </div>
  )
}

export default Product