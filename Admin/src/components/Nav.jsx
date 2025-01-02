import React from 'react'
import {assets} from '../assets/assets'
const Nav = ({setToken}) => {
  return (
    <div className='flex items-center justify-between py-2 px-1'>
        <img src={assets.logo} alt="Logo" className='w-[max(10%,80px)] ' />
        <button className='bg-gray-600 text-white py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm' onClick={()=>setToken('')}>Log out</button>
    </div>
  )
}

export default Nav