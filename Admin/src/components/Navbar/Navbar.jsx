import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import navProfile from '../../assets/adminpanel.png.png'
function Navbar() {
  return (
    <div className='navbar'>
        <img src={navProfile} alt="" className='nav-profile' />
        <img src={logo} alt="" className='nav-profile' />
        
    </div>
  )
}

export default Navbar