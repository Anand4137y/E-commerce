import React, {useRef, useContext, useState } from 'react'
import './Navbar.css'
import logo from '../../assets/asset/logo.png'
import cart_icon from "../../assets/asset/cart_icon.png"
import { Link } from 'react-router-dom'
import { shopContext } from '../../context/Shopcontext'
import  nav_dropdown from "../../assets/asset/dropdown_icon.png"         //  need to import nav dropdown arrow icon 
function Navbar() {
    const [menu,setMenu]=useState("shop")
    const {getTotalCartItems} = useContext(shopContext)
    const menuRef = useRef();
    const dropdown_toggle = (e)=>{
        menuRef.current.classList.toggle('nav-menu-visible')
        e.target.classList.toggle('open')
    }
  return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={logo} alt="" />
            <p>SHOPPER</p>
        </div>
        <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
        <ul ref={menuRef} className="nav-menu">
            <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration:"none",color:'black'}} to='/'>SHOP</Link>  {menu==="shop"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("mens")}} > <Link style={{textDecoration:"none",color:'black'}} to='/mens'>MEN</Link> {menu==="mens"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("womens")}}><Link style={{textDecoration:"none",color:'black'}} to='/womens'>WOMEN</Link> {menu==="womens"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("kids")}}><Link style={{textDecoration:"none",color:'black'}} to='/kids'>KIDS</Link> {menu==="kids"?<hr/>:<></>}</li>
        </ul>
        <div className="nav-login-cart">
            {localStorage.getItem('auth-token')
            ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
            :<Link  to='/login'><button>Login</button></Link>}
        
            <Link to='/cart'><img src={cart_icon} alt="" /></Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
        
    </div>
  )
}

export default Navbar