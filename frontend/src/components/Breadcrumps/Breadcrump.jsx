import React from 'react'
import './Breadcrump.css'
import arrow_icon from '../../assets/asset/breadcrum_arrow.png'
function Breadcrump(props) {
    const {product} =props
  return (
    <div className='breadcrum'>
        HOME  <img src={arrow_icon} alt="" /> SHOP <img src={arrow_icon} alt="" /> {product.category} <img src={arrow_icon} alt="" />{product.name}
    </div>
  )
}

export default Breadcrump