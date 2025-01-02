import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import { Shopcontext } from '../context/Shopcontext'
import Carttotal from '../components/Carttotal'
import { assets } from '../assets/assets/frontend_assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'


const Placeorder = () => {


  const { getTotalAmount,navigate,token,cartItems,setCartitems,delivery_fee,currency,products,backendUrl} = useContext(Shopcontext);
  const[method,setMethod]=useState('cod')
  const [formData,setFormData]=useState({
    firstName:'',
    lastName:'',
    email:'',
    city:'',
    street:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''

  })

  const onChangeHandler=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    setFormData(data=>({...data,[name]:value}))

  }

  const onSubmitHandler=async(e)=>{
    e.preventDefault(); 
    try {


      let orderItems=[];
      for(const items in cartItems){
        for(const item in cartItems[items]){
          if (cartItems[items][item]>0) {
            const itemInfo=structuredClone(products.find(product=>product._id==items))
            if (itemInfo) {
              itemInfo.size=item;
              itemInfo.quantity=cartItems[items][item]
              orderItems.push(itemInfo)
              
            }
            
          }
        }
       
      }
      let orderData={
        address:formData,
        items:orderItems,
        amount:getTotalAmount()+delivery_fee


      }

      switch (method) {
        case'cod':
        
        
       const response= await axios.post(backendUrl+'/api/order/place',orderData,{headers:{token:token}})
        console.log(response.data);
        
        if (response.data.success) {
          setCartitems({});
        navigate('/orders')
          
        }
        
        else{
          toast.eror(response.data.message)
        }

        break;
        case'stripe':
        const responseStripe=await axios.post(backendUrl+'/api/order/stripe',orderData,{headers:{
          token:token
        }})
        if (responseStripe.data.success) {
          const{session_url}=responseStripe.data;
          console.log(session_url);
          
          window.location.replace(session_url)

          
        }
        else{
          toast.error(responseStripe.data.message)
        }
        break;


        default:
          break;


      
      }

      

      
    } catch (error) {
      
    }

  }


  useEffect(()=>{
    console.log(method)
  },[method])
  return (
    <form className='    flex flex-col sm:flex-row justify-between gap-5 pt-5 sm:pt-5 border-t' onSubmit={onSubmitHandler}>
      <div className='flex flex-col gap-4 w-ful sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'Delivery'} text2={'Information'} />


        </div>
        <div className='flex gap-3'>
          <input  required onChange={onChangeHandler}  name='firstName' value={formData.firstName} type="text" placeholder='FirstName' className='border  border-gray-500 rounded py-1.5 px-3.5 w-full ' />
          <input  required onChange={onChangeHandler}  name='lastName' value={formData.lastName} type="text" placeholder='LastName' className='border  border-gray-500 rounded py-1.5 px-3.5 w-full ' />

        </div>


        <input   required onChange={onChangeHandler}  name='email' value={formData.email} type="email" placeholder='email' className='border  border-gray-500 rounded py-1.5 px-3.5 w-full ' />
        <input  required onChange={onChangeHandler}  name='street' value={formData.street} type="text" placeholder='street' className='border  border-gray-500 rounded py-1.5 px-3.5 w-full ' />

     
      <div className='flex gap-3'>
        <input  required  onChange={onChangeHandler}  name='city' value={formData.city} type="text" placeholder='city' className='border  border-gray-500 rounded py-1.5 px-3.5 w-full ' />
        <input  required  onChange={onChangeHandler}  name='state' value={formData.state} type="text" placeholder='State' className='border  border-gray-500 rounded py-1.5 px-3.5 w-full ' />

      </div>
      <div className='flex gap-3'>
        <input  required  onChange={onChangeHandler}  name='zipcode' value={formData.zipcodeipcode} type="number" placeholder='Zipcode' className='border  border-gray-500 rounded py-1.5 px-3.5 w-full ' />
        <input    required onChange={onChangeHandler}  name='country' value={formData.country} type="text" placeholder='Country' className='border  border-gray-500 rounded py-1.5 px-3.5 w-full ' />

      </div>
      <div className='flex gap-3'>
        <input   required  onChange={onChangeHandler}  name='phone' value={formData.phone} type="number" placeholder='Phone Number' className='border  border-gray-500 rounded py-1.5 px-3.5 w-full ' />
      </div>
      </div>
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
       <Carttotal/>

        </div>
        <div className='mt-12'>
          <Title text1={'Payment'} text2={'Method'}/>
          <div className='flex gap-3 flex-col lg:flex-row ' >
            <div className='flex items-center gap-3 border p-2 px-3 cursor-pointer' onClick={()=>setMethod('stripe')}>
              <p className={`min-w-3.5 h-3.5 border rounded  ${method==='stripe'?'bg-green-300':''}`}></p>
              <img src={assets.stripe_logo} alt="" />
            </div>
            <div className='flex items-center gap-3 border p-2 px-3 cursor-pointer '  onClick={()=>setMethod('razorPay')}>
              <p className={`min-w-3.5 h-3.5 border rounded  ${method==='razorPay'?'bg-green-300':''}`}></p>
              <img src={assets.razorpay_logo} alt="" />

            </div>
            <div className='flex items-center gap-3 border p-2 px-3 cursor-pointer' onClick={()=>setMethod('cod')}>
              <p className={`min-w-3.5 h-3.5 border rounded  ${method==='cod'?'bg-green-300':''}`}></p>
              <p className='text-gray-500 text-sm mx-4'>Cash On Delivery</p>
            </div>
          </div>
        <div className='w-full text-end mt-4'>
          <button  type='submit' className='bg-black text-white px-4 py-2 mt-3 rouded '  >PlaceOrder</button>
        </div>
        </div>
      </div>
    </form>
  )
}

export default Placeorder