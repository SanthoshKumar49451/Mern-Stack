import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets/frontend_assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { Shopcontext } from '../context/Shopcontext'

const Nav = () => {
  const [visible, setvisible] = useState(false)
  const { setShowsearch } = useContext(Shopcontext)
  const { getCartCount,token,setToken,setCartitems,navigate} = useContext(Shopcontext)
  const c=getCartCount()

  const logout=()=>{
    navigate('/login')

    localStorage.removeItem("token")
    setToken('')
    setCartitems({})
   
  }
  
  
  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <img src={assets.logo} alt="logo" />
      <ul className='hidden sm:flex gap-5 text-sm text-grey-700'>
        <NavLink to='/home' className='  flex flex-col items-center gap-1'>
          <p>Home</p>
          <hr className=' hidden w-2/3 border-none h-[1.5px] bg-gray-700' />

        </NavLink>
        <NavLink to='/collection' className='   flex flex-col items-center gap-1'>
          <p>Collection</p>
          <hr className=' hidden w-2/3 border-none h-[1.5px] bg-gray-700' />

        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p>About</p>
          <hr className=' hidden w-2/3 border-none h-[1.5px] bg-gray-700' />

        </NavLink>
        <NavLink to='/Contact' className='flex flex-col items-center gap-1'>
          <p>Contact</p>
          <hr className=' hidden w-2/3 border-none h-[1.5px] bg-gray-700' />

        </NavLink>



      </ul>

      <div className='flex items-center gap-6 '>
        <img src={assets.search_icon} alt="" className='w-5 cursor-pointer' onClick={() => { setShowsearch(true) }} />

        <div className='group relative'>
          <img  onClick={()=>token?null:navigate('/login')} src={assets.profile_icon} alt="search" className='w-5 cursor-pointer' />
          {/* Dropdown  */}
           {
            token&& <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-110 text-gray-500 absolute   '>
           
            <p className='cursor-pointer hover:text-black'>My profile</p>
            <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
            <p onClick={logout} className='cursor-pointer hover:text-black' >Logout</p>
          </div>
           }
          </div>
    
       
        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} alt='cart' className='w-5 cursor-pointer ' />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center bg-black text-white rounded-full text-[10px] aspect-square'>{getCartCount()}</p>
        </Link>
        <img onClick={() => setvisible(true)} src={assets.menu_icon} alt="" className=' w-5 cursor-pointer block sm:hidden md:hidden lg:hidden xl:hidden' />

      </div>
      <div className={`absolute top-0 bottom-0 right-0 overflow-hidden  bg-white ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex-col text-gray'>
          <div className='flex items-center gap-4 p-3' onClick={() => setvisible(false)}>
            <img src={assets.dropdown_icon} alt="" className='h-4 rotate-180' />
            <p>Back</p>
          </div >
          <div className='flex flex-col  p-2'>
            <NavLink to='/' className='py-2 pl-6 border-b-2 border-black-400 w-full text-center' onClick={() => setvisible(false)}>Home
            </NavLink>
            <NavLink to='/collection' className='py-2 pl-6  border-b-2 border-black-400 w-full justify-center text-center ' onClick={() => setvisible(false)}>Collection
            </NavLink>
            <NavLink to='/about ' className='py-2 pl-6  border-b-2 border-black-400 w-full text-center' onClick={() => setvisible(false)}>About
            </NavLink>
            <NavLink to='/contact' className='py-2 pl-6 border-b-2 border-black-400 w-full text-center' onClick={() => setvisible(false)}>Contact
            </NavLink>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Nav