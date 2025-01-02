import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets/frontend_assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const Contact = () => {
  return (
    <div >

      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'Contact'} text2={'Us'}/>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img src={assets.contact_img} alt="" className='w-full md:max-w-[450px]'/>
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='font-semibold text-xl text-gray-600'>Rajahmundry <br />East Godavari <br />Andhrapradesh <br />India</p>
          <p className='font-semibold text-xl text-gray-600'>Tel:+91-6301149451</p>
          <p className='font-semibold text-xl text-gray-600'>Smail:santhosh49451@gamil.com</p>
          <p  className='font-semibold text-xl text-gray-600'> Careers</p>
          <button className='border border-black px-8 text-sm text-black py-3 rounded hover:bg-black hover:text-white transition-all duration-500'>Jobs</button>
         
        </div>
      </div>
      <NewsLetterBox/>
    </div>
  
  )
}

export default Contact