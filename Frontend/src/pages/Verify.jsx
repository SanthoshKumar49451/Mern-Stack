import React, { useContext, useEffect, useState } from 'react'
import { Shopcontext } from '../context/Shopcontext'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Verify = () => {
    const {navigate,token,setCartitems,backendUrl}=useContext(Shopcontext)
    const [searchParams,setSearchparams]=useSearchParams()
    const success=searchParams.get('success')
    const orderId=searchParams.get('orderId')

  
    const verify=async()=>{
        try {
            if (!token) {
                return null;
                
            }
            const response=await axios.post(backendUrl+'/api/order/verify',{success,orderId},{headers:{
                token:token
            }})
           if (response.data.success) {
            setCartitems({})
            navigate('/orders')
            
           }
           else{
            navigate('/cart')
           }
            
        } catch (error) {
            toast.error(error.message)
            
        }

    }

    useEffect(()=>{
        verify();
    },[token])
  return (
    <div></div>
  )
}

export default Verify