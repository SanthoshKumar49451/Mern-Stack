import React, { useContext, useEffect, useState } from 'react'
import { Shopcontext } from '../context/Shopcontext'
import Title from './Title';
import Productitem from './Productitem';


const BestSeller = () => {
    const { products } = useContext(Shopcontext);
    const [bestseller, setbestseller] = useState([]);

    useEffect(() => {
        const bestProduct = products.filter((item) => item.bestSeller)
        setbestseller(bestProduct.slice(0, 5))
        
        

    }, [products])
    console.log(products);
    
  
    return (
        <div className='my-10'>
            <div className='text-center tet-3xl py-10'>
                <Title text1={"Best"} text2={'seller'} />
                <p className='w-3/4 m-auto text-xs sm:text:sm md:text-base  text-gray-600'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius magni qui illum dicta beatae delectus eveniet ipsam quod velit quam officia molestias, in ratione. Nostrum labore officia aliquid dolor aspernatur!</p>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    bestseller.map((item, index) => (
                        <Productitem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
                    ))
                }
            </div>
        </div>

    )
}

export default BestSeller;