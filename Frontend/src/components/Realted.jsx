import React, { useContext, useState, useEffect } from 'react'
import { Shopcontext } from '../context/Shopcontext'
import Productitem from './Productitem';
import Title from './Title'

const Realted = ({ category, subcategory }) => {

  const { products } = useContext(Shopcontext)
  const [realted, setRelated] = useState([]);
  useEffect(() => {
    if (products.length > 0) {
      let fpCopy = [...products]
      fpCopy = fpCopy.filter(item => category === item.category)
      fpCopy = fpCopy.filter(item => subcategory === item.subCategory)
      setRelated(fpCopy.slice(0, 5))


    }
  }, [products])





  return (
    <div className='my-24'>
      <div className='text-center text-3xl py-2'>
        < Title text1={'Related'} text2={'Products'} />

      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {realted.map((item, index) => (
          <Productitem key={index} id={item._id} name={item.name} price={item.price} image={item.image} />
        ))}
      </div>
    </div>
  )
}

export default Realted