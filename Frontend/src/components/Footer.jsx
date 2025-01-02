import React from 'react'
import { assets } from '../assets/assets/frontend_assets/assets'

const Footer = () => {
    return (
        <div >
            <div className='flex flex-col sm:grid grid-cols-3 gap-6 mt-40 my-10 text-sm ' >
                <div>
                    <img src={assets.logo} alt="" className='mb-5 w-32 ' />
                    <p className='w-full md:w-2/3 text-gray-400'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis perspiciatis eos atque in, odio porro error laudantium labore. Inventore reprehenderit aliquam deleniti, hic nostrum eveniet sunt iure tempore aliquid libero.
                    </p>
                </div>
                <div className=''>
                    <p className='text-xl font-medium mb-5'>Company</p>
                    <ul className='flex flex-col gap-1 text-gray-400'>
                        <li>Home</li>
                        <li>About US</li>
                        <li>Delievery</li>
                        <li >Privacy Policy</li>
                    </ul>
                </div>
                <div >
                    <p className='text-xl font-medium  mb-5 '>Get in touch </p>
                    <ul className='flex flex-col gap-1 text-gray-400'>
                        <li className='text-blue-500'>+91-6301149451</li>
                        <li className='text-blue-500'>santhosh49451@gamil.com</li>

                    </ul>
                </div>

            </div>
            <div >
            
                <p className='  py-2 w-[100%] text-center  bg-black text-white rounded '> Copyright 2024 forever.com_All rights reserved .</p>
            </div>
        </div>
    )
}

export default Footer