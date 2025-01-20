import React, { useState,useEffect } from 'react'
import './css/ShopCategory.css'
import { useContext } from 'react'
import { shopContext } from '../context/Shopcontext'

import Item from '../components/Navbar/items/Item'
import {Button} from 'react-bootstrap'

function ShopCategory(props) {
  const {all_product} = useContext(shopContext)
  const [sortoption,setSortoption]=useState('')
  const [sorted_products,setSorted_products]=useState([])
  const [search,setSearch]=useState('')

  // const sorted_products = all_product.filter((item)=>item.category === props.category)
  useEffect(()=>{
    setSorted_products(all_product.filter((item)=>item.category === props.category))
  },[all_product,props.category])

  const handleSortChange=(val)=>{
      setSortoption(val)
    }
    if(sortoption ==='price-asc'){
      sorted_products.sort((a,b)=>a.new_price - b.new_price)
    }else if(sortoption === 'price-dec'){
      sorted_products.sort((a,b)=>b.new_price -a.new_price)
    }
      //    for geting search value 
      const Searchval=(e)=>{
        setSearch(e.target.value)
      }
      //  
      const filteredSearch = ()=>{
         let product = all_product.filter((item)=> item.name.toLowerCase().includes(search.toLowerCase()  
        //  item.category.toLowerCase().includes(search.toLowerCase()
        ) );
         setSorted_products(product)
      }
          
        
      
  return (
    <div className='shop-category'>
      {/* search */}
      
      <div className='maincontainer'>
        <nav className='seachbox'>
            <input className='search' type="search" value={search} onChange={Searchval}  placeholder='Type Product here...'/>
            <button className='search-btn' onClick={filteredSearch}  type='search'>Search</button>
        </nav>
    </div>
        {/* search  */}
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span>
        </p>
        
           
          <select className='shopcategory-sort' value={"sortoption"} onChange={(e)=>handleSortChange(e.target.value)} >
            <option value=''>Sort by</option>
            <option value={"price-asc"}>Price:Low-High</option>
            <option value={"price-dec"}>Price:High-Low</option>

          </select>
          
        
      </div>
      <div className="shopcategory-products">
        {sorted_products.map((item,i)=>{
          
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />

          
        })}
      </div>

      
      <Button variant='secondary' className="shopcategory-loadmore">Explore More</Button>
      

    </div>
  )
}

export default ShopCategory