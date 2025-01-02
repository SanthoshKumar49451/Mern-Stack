import React, { useContext } from 'react'
import { Shopcontext } from '../context/Shopcontext'
import { Link } from 'react-router-dom'

const Productitem = ({ id, image, name, price }) => {
  const { currency } = useContext(Shopcontext)
  return (
    <Link to={`/product/${id}`} className='text-gray cursor-pointer'>
      <div className='overflow-hidden'>
        <img src={image[0]} alt="" className='hover:scale-110 transition ease-in-out' />
      </div>
      <p className='pt-3 pb-1 text-sm'>{name}</p>
      <p className='text-sm font-medium'>{currency}{price}</p>

    </Link>
  )
}

export default Productitem