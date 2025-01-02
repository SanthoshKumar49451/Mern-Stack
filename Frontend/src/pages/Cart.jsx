import React, { useContext, useEffect, useState } from 'react'
import { Shopcontext } from '../context/Shopcontext'
import Title from '../components/Title'
import { assets } from '../assets/assets/frontend_assets/assets'
import Carttotal from '../components/Carttotal'


const Cart = () => {
  const { products, currency, cartItems,updatedCart ,navigate} = useContext(Shopcontext)


  

  const [cartData, setCartData] = useState([])
  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item]) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item]
          })

        }
      }

    }
    setCartData(tempData)
  }, [cartItems])



  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'Your'} text2={'Cart'} />

      </div>
      <div>{
        cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);
          console.log(productData)
          return (
            <div key={index} className='py-4 border-t border-b textgray-200 grid grid-cols-1 items-center gap-4'>
              <div className='flex items-start justify-between  gap-5'>
                <img src={productData.image[0]} alt="" className='w-16 sm:w-20' />
                <div>
                  <p className='text-sm sm:text-lg font-medium'>{productData.name}</p>
                  <div className='flex items-center gap-5 mt-2'>
                    <p>{currency} {productData.price}</p>
                    <p className='px-2 sm:px-3 sm:py-1 '>{item.size}</p>
                  </div>
                 
                 
                </div>
                <div>
                <input type="number" min={1} defaultValue={item.quantity} className='max-w-10  sm:max-w-20 border outline-none' onChange={(e)=>e.target.value==''||e.target.value==0?null:updatedCart(item._id,item.size,Number(e.target.value))} / >
                </div>
                <div>
               
                <img src={assets.bin_icon} alt="" className='w-4 mr-5 sm:w-5 cursor-pointer'  onClick={()=>updatedCart(item._id,item.size,0)}/>
                </div>
              
                
                
                
                

              </div>
              
            </div>
          )
        })}</div>
        <div className='flex justify-end my-20'>
          <div className='w-full sm:[w-430px]'>
            <Carttotal/>
            <div className='w-full text-end'>
              <button className='bg-black  text-white px-3 py-2  rounded mt-3 ' onClick={()=>navigate('/placeorder')}>Checkout</button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Cart