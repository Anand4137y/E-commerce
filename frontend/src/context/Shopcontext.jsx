import React, { createContext, useEffect, useState } from 'react'

export const shopContext = createContext(null)
const getDefaultCart = ()=>{
    let cart = {}
    for (let index = 0; index < 300+1; index++) {
        cart[index] = 0
    }
    return cart
}

const ShopContextProvider = (props)=>{
    const [all_product,setAll_product] =useState([])
    const [cartItem,setCartItem] = useState(getDefaultCart())

    useEffect(()=>{
        fetch('http://localhost:4000/allproducts') 
        .then((response)=>response.json())
        .then((data)=>setAll_product(data))

        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/getcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'content-Type':'application/json',
                },
                body:"",
            }).then((response)=>response.json())
            .then((data)=>setCartItem(data))
        }
    },[])
   

    const addToCart = (itemId) => {
        setCartItem((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/addtocart',{
                method:"POST",
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId})
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data))
            .catch((error)=>console.log(error))
        }
    }
    const removeFromCart = (itemId) => {
        setCartItem((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/removefromcart',{
                method:"POST",
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId})
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data))
            .catch((error)=>console.log(error))
        }

    }
    const getTotalAmount = ()=>{
        let totalAmount = 0
        for(const item in cartItem){
            if(cartItem[item]>0){
                let itemInfo = all_product.find((product)=>product.id===Number(item))
                totalAmount += itemInfo.new_price * cartItem[item]
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = ()=>{
        let totalItem = 0;
        for(const item in cartItem){
            if(cartItem[item]>0)
                {
                    totalItem += cartItem[item]
                }
        }
        return totalItem
    }
    const contextValue = {getTotalCartItems,getTotalAmount,all_product,cartItem,addToCart,removeFromCart}
    return (
        <shopContext.Provider value={contextValue}>
            {props.children}
        </shopContext.Provider>
    )
}


export default ShopContextProvider