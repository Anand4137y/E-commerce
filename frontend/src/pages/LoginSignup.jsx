import React, {  useState } from 'react'
import axios from 'axios'
import './css/Loginsignup.css'
import { ToastContainer, toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Button} from 'react-bootstrap'




function LoginSignup() {
 const [otp,setOtp]=useState(false)
 const [resotp,setResotp]=useState('')
 const [inpotp,setInpotp]=useState('')
 const [state,setState]=useState('Login')
 const [formdata,setFormdata]=useState({
  username:"",password:"",email:""
 })

// otp creating api
const createOtp=()=>{
  console.log(formdata.email);
  axios.post("http://localhost:4000/otp/otpsend",{email:formdata.email}).then((res)=>{
    console.log(res,"here");
    if(res.data.success){
      setOtp(!otp)
      setResotp(res.data.otp)
    }else{
      console.log("error");
    }
  })
}

//     getting otp from the input
const getOtp=(e)=>{
 setInpotp(e.target.value)
 
}



const changehandler=(e)=>{
  setFormdata({...formdata,[e.target.name]:e.target.value})
}
//   Login 
const login = async ()=>{
 let responseData;
  await fetch('http://localhost:4000/login',{
   method:'POST',
   headers:{
     Accept:'application/form-data',
     'content-Type':'application/json'
   },
   body:JSON.stringify(formdata),
  }).then((response)=>response.json()).then((data)=>responseData = data)
  if(responseData.success){
       localStorage.setItem('auth-token',responseData.token)
      window.location.replace('/')
      toast.success('Login Successfully',{
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      })
    }else{
     toast.error(responseData.errors,{
       position: "top-center",
       autoClose: 5000,
       hideProgressBar: false,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: true,
       progress: undefined,
       theme: "dark",
       transition: Bounce,
     })
     
    }
  }

     

     
     
    
     
     
     


//   signup api 
const signup = async ()=>{
   if(+resotp === +inpotp){
     let responseData;
     setOtp(!otp)
   await fetch('http://localhost:4000/otp/signup',{
    method:'POST',
    headers:{
      Accept:'application/form-data',
      'content-Type':'application/json'
    },
    body:JSON.stringify(formdata),
   }).then((response)=>response.json()).then((data)=>responseData = data)
   if(responseData.success){
    localStorage.setItem('auth-token',responseData.token)
    
    setState('Login')
    toast.success('Successfully Created Account',{
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    })
    formdata.email=''
    formdata.password=''
   }else{
    toast.error(responseData.errors,{
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    })
    
   }
  }else{
   toast.error("otp is not correct",{
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
   })

  }
 
 }



  return (
    
    
      <div className='loginsignup'>
      <div className="loginsignup-container">
       <h1>{state}</h1>
       <div className="loginsignup-fields">
         {state === 'Sign Up'?<input name='username' value={formdata.username} onChange={changehandler} type='text' placeholder='You Name'/>:<></>}
        <input name='email' value={formdata.email} onChange={changehandler}  type='email' placeholder='You Email'/>
        <input name='password' value={formdata.password} onChange={changehandler}  type='password' placeholder='Password'/>
        
          {
            otp ===true && state ==='Sign Up'?
            <div className="otp-container">
              <input value={inpotp} onChange={getOtp} type="text" placeholder='4-digit-otp'/>
              
              
            </div>:<></>
          }

          
      </div>
      {
        otp === true ?
        <Button variant='primary' onClick={signup} >verify</Button>:
        <Button variant='primary' onClick={()=>{state==='Login'?login():createOtp();}}>Continue</Button> 
      }
      {state === 'Sign Up'? 
      <p className='loginsignup-login'>Already have an account? <span onClick={()=>setState("Login")}>Login</span></p>:
      <p className='loginsignup-login'>Create an account? <span onClick={()=>setState("Sign Up")}>Clich here</span></p>}
      <div className="loginsignup-agree">
        <input  type='checkbox' name='' id=''/>
        <p>By Continuing,i agree to the terms of use & privacy Policy.</p>
      </div>
      </div> 
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        />
    </div>
    

  
    
  )
}

export default LoginSignup
