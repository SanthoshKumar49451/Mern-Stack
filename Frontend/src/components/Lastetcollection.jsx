// Lastetcollection.js
import React, { useContext, useEffect, useState } from 'react';
import { Shopcontext } from '../context/Shopcontext';
import Title from './Title';
import Productitem from './Productitem';



const Lastetcollection = () => {
    const { products } = useContext(Shopcontext)
    const [latest, setlatest] = useState([])
    useEffect(() => {
        setlatest(products.slice(0, 10))
    }, [products])




    return (
        <div className='text-center py-8 text-3xl'>
            <Title text1={'latest'} text2={'collection'} />
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error quae nisi neque deleniti in, consequuntur cumque maiores quos incidunt, eos consectetur? Assumenda harum obcaecati provident omnis inventore eligendi, doloribus iusto.</p>
            {/*render products */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    latest.map((item, index) => (
                        <Productitem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />

                    ))
                }
            </div>


        </div>
    );
}

export default Lastetcollection;
