import React from 'react'
import Hero from '../components/Navbar/Hero/Hero'
import Popular from '../components/Navbar/Popular/Popular'
import Offers from '../components/offers/Offers'
import Newcollections from '../components/Newcollections/Newcollections'
import Newletter from '../components/Newsletter/Newletter'

function Shop() {
  return (
    <div>
      <Hero/>
      <Popular/>
      <Offers/>
      <Newcollections/>
      <Newletter/>
    </div>
  )
}

export default Shop