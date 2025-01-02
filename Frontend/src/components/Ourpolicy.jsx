import React from 'react'
import { assets } from '../assets/assets/frontend_assets/assets'

const Ourpolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700 '>
      <div >
        <img src={assets.exchange_icon} alt="exchange-icon" className='w-1/2 m-auto mb-5' />
        <p className='font-semibold'>East Exchange Policy </p>
        <p className='text-gray-400'>Now offer ,Exchange policy</p>

      </div>
      <div >
        <img src={assets.quality_icon} alt="exchange-icon" className='w-1/2 m-auto mb-5' />
        <p className='font-semibold'>7 Days return policy </p>
        <p className='text-gray-400'>We provide & returns policy</p>

      </div>
      <div >
        <img src={assets.support_img} alt="exchange-icon" className='w-1/2 m-auto mb-5' />
        <p className='font-semibold'>Best Customer Support</p>
        <p className='text-gray-400'>We provide 24/7 Customer Sopport</p>

      </div>
    </div>
  )
}

export default Ourpolicy