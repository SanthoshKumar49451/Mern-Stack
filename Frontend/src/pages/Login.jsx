import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { Shopcontext } from '../context/Shopcontext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const{token,setToken,navigate,backendUrl}=useContext(Shopcontext)
  const [profile,setProfile]=useState('login')
  const[name,setName]=useState('')
  const[password,setPassword]=useState('')
  const[email,setEmail]=useState('')
  
  

  const onSubmit= async(e)=>{
    e.preventDefault()
    try {
      if (profile==='signup') {
        const response=await axios.post(backendUrl+"/api/user/register",{name,email,password})
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem("token",response.data.token)
          
          
        }
        else{
        toast.error(response.data.message)
        }
  
       
        
      }
      else{
        const response=await axios.post( "http://localhost:3183/api/user/login",{email,password})
      if (response.data.success) {
        setToken(response.data.token)
        localStorage.setItem("token",response.data.token)
      
        
      }
      else{
        toast.error(response.data.message)
      }

      }
      
    } catch (error) {
      toast.error(error.message)
      
    }

  }
  useEffect(() => {
    
    if (token) {
      navigate('/');  // Redirect to home page
    }
  }, [token, navigate]);  // This will trigger when token changes
  return (
   <form  onSubmit={onSubmit}className='flex flex-col items-center w-[50%]  sm:max-w-[90%] m-auto gap-4 text-gray-400'>
    <div className='inline-flex items-center gap-2 mb-2 mt-10'>
      <p  className='text-2xl text-black'> {profile}</p>
     
    </div>
    {profile==='login'?'': <input onChange={(e)=>setName(e.target.value)} type="text" className='w-full px-3 py-2 border  border-gray-800  rounded' placeholder='Name' required value={name} />}
   
    <input type="email" className='w-full px-3 py-2 border  border-gray-800  rounded' placeholder='Email'  required  onChange={(e)=>setEmail(e.target.value)} value={email}/>
    <input type="password" className='w-full px-3 py-2 border  border-gray-800 rounede ' placeholder='Password'  required onChange={(e)=>setPassword(e.target.value)} value={password}/>
    <div className='w-full flex justify-between text-sm mt-[-8px]'>
      <p className='cursor-pointer text-black'>Forgot Your Password?</p>
      {
        profile==='login'?
        <p className='cursor-pointer text-blue-400 font-medium' onClick={()=>setProfile('signup')}>Create Account</p>:<p  className='cursor-pointer text-blue-400 font-medium' onClick={()=>setProfile('login')}>Log in</p>
      }
    </div>
    <button  className='bg-black text-white px-8 py-2 mt-4 rounded'>{profile==='login'?'signin':'signup'}</button>
   </form>
  )
}

export default Login