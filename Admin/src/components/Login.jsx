import axios from 'axios'
import React, { useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Login = ({setToken}) => {
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')

    const onSubmitHandler=async(e)=>{
        try {
          e.preventDefault();
          const response=await axios.post(backendUrl+'/api/user/admin',{email,password})
          
          
          if (response.data.success) {
            
            setToken(response.data.token)
          }
          else{
            toast.error(response.data.message)
          }
          
            
        } catch (error) {
            toast.error(error.message)
            console.log(error)

            
        }
    }
  return ( 
    <div className='flex items-center justify-center h-screen w-full' >
        <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'> 
            <h1 className='text-2xl font-bold mb-3'>Admin Panel</h1>
            <form  onSubmit={onSubmitHandler}>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Email address</p>
                    <input type="email" name="" id="" placeholder='Enter Email' required  className='rouned-md w-full px-3 py-2 border border-gray-300 outline-none hover:border-blue-300 hover:rounded' onChange={(e)=>setEmail(e.target.value)} value={email}/>
                </div>
                <div>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                    <input type="password" name="" id="" placeholder='Enter Password' required  className='rouned-md w-full px-3 py-2 border border-gray-300 outline-none hover:border-blue-300  hover:rounded'  onChange={(e)=>setPassword(e.target.value)} value={password}/>
                </div>
                <button type='submit' className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black hover:bg-gray-800'>Login</button>
            </form>

        </div>

    </div>
  )
}

export default Login