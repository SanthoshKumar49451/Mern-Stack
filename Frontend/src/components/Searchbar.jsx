import React, { useContext, useEffect, useState } from 'react'
import { Shopcontext } from '../context/Shopcontext'
import { assets } from '../assets/assets/frontend_assets/assets'
import { useLocation } from 'react-router-dom'

const Searchbar = () => {
    const { search, setSearch, showsearch, setShowsearch } = useContext(Shopcontext)
    const location=useLocation()
    const[visible,setVisible]=useState(false)
    useEffect(()=>{
        if (location.pathname.includes('collection')) {
            setVisible(true)

            
        }
        else{
            setVisible(false)
        }

    },[location])
    return showsearch &&visible? (
        <div className='border-t border-b bg-gray-500 text-center'>
            <div className='inline-flex  items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'  >
                <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Search Items.. ' className='flex-1 outline-none bg-inherit text-sm ' />
                <img src={assets.search_icon} alt="" className='w-4' />
                <img src={assets.cross_icon} alt="" className=' ml-5  w-3 cursor-pointer' onClick={() => setShowsearch(false)} /></div>

        </div>
    ) : null
}

export default Searchbar