import React, { useContext } from 'react'
import { Shopcontext } from '../context/Shopcontext'
import Title from './Title'

const Carttotal = () => {
    const {currency,delivery_fee,getTotalAmount}=useContext(Shopcontext)
  return (
    <div className='w-full'>
        <div className='text-2xl'>
            <Title text1={'Cart'} text2={"Totals"}/>
            
        </div>
        <div className='flex flex-col gap-2 mt-2 text-sm'>
            <div className='flex justify-between'>
                <p>Subtotal</p>
                <p>{currency}{getTotalAmount()}</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <p>Shipping fee</p>
                <p>{currency} { getTotalAmount()===0?0: delivery_fee}</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <b>Total</b>
                <b>{currency} {getTotalAmount()===0?0:getTotalAmount() + delivery_fee}</b>
            </div>
        </div>
    </div>
  )
}

export default Carttotal