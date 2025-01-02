import React, { useContext, useEffect, useState } from 'react'
import { Shopcontext } from '../context/Shopcontext'
import { assets } from '../assets/assets/frontend_assets/assets';
import Title from '../components/Title';
import Productitem from '../components/Productitem';

const Collection = () => {
  const {products,search,showsearch}=useContext(Shopcontext);
  const[showFilters,setShowFilters]=useState(false)
  const [filterProducts,setFilterProducts]=useState([])
  const[cateogery,setCateogery]=useState([])
  const [subCateogery,setSubCateogery]=useState([])
  const[sortType,setsortType]=useState('relavent')
 
  const toggleCateogery=(e)=>{
    if(cateogery.includes(e.target.value)) {
      setCateogery(prev=>prev.filter(item=>item!==e.target.value))
      
    }
    else{
      setCateogery(prev=>[...prev,e.target.value])
    }
  }
  const togglesubCateogery=(e)=>{
    if (subCateogery.includes(e.target.value)) 
      {
        setSubCateogery(prev=>prev.filter(item=>item!==e.target.value))
      
    }
    else{
      setSubCateogery(prev=>[...prev,e.target.value])
    }
  

  }
  const applyFilter = () => {
    let filteredProducts = [...products];
    if (search) {
      filteredProducts=filteredProducts.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
      
      
      
    }

    // Filter by category
    if (cateogery.length > 0) {
      filteredProducts = filteredProducts.filter(item => cateogery.includes(item.category));  
    }

    // Filter by sub-category
    if (subCateogery.length > 0) {
      filteredProducts = filteredProducts.filter(item => subCateogery.includes(item.subCategory));
    }

    setFilterProducts(filteredProducts);
  };
  const sort=()=>{
    let fpCopy=[...filterProducts]
    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b)=>a.price-b.price))
        
        break;
        case 'high-low':
          setFilterProducts(fpCopy.sort((a,b)=>b.price-a.Price))
          break;
    
      default:
        applyFilter();
        break;
    }
  }


    useEffect(()=>{
    setFilterProducts(products)
   
  },[])
  useEffect(()=>{
    sort()
  },[sortType])
  useEffect(()=>{
    applyFilter()
  },[cateogery,subCateogery,search,products])
 
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10'>

      <div className='min-w-60'>
      <p className='my-2 text-center  text-xl flex items-center cursor-pointer gap-2' onClick={()=>setShowFilters(!showFilters)}>
        Filters
      </p>
      <img src={assets.dropdown_icon} alt="" className={`h-3 sm:hidden ${showFilters?'rotate-50':' '} `} />
      <div className={`border border-gray-300 pl-5 mt-6 ${showFilters?'':'hidden'} sm:block py-3`}>
        <p className='mb-3 font-medium'>Categories</p>
        <div className='flex flex-col gap-2 text-sm font-light text-gray-7oo'>
          <p className='flex gap-2'>
            <input type="checkbox" className='w-3' value={'Men'}  onChange={toggleCateogery}/>Men
          </p>
          <p className='flex gap-2'>
            <input type="checkbox" className='w-3' value={'Women'}  onChange={toggleCateogery}/>Women 
          </p>
          <p className='flex gap-2'>
            <input type="checkbox" className='w-3' value={'Kids'} onChange={toggleCateogery} />Kids 
          </p>

        </div>
      </div>
      <div className={`border border-gray-300 pl-5 mt-6 ${showFilters?'':'hidden'} sm:block py-3`}>
        <p className='mb-3 font-medium'>Type</p>
        <div className='flex flex-col gap-2 text-sm font-light text-gray-7oo'>
          <p className='flex gap-2'>
            <input type="checkbox" className='w-3' value={'Topwear'}   onChange={togglesubCateogery}/>Topwear
          </p>
          <p className='flex gap-2'>
            <input type="checkbox" className='w-3' value={'Bottomwear'}    onChange={togglesubCateogery}/>Bottomwear
          </p>
          <p className='flex gap-2'>
            <input type="checkbox" className='w-3' value={'Winterwear'}     onChange={togglesubCateogery}/>Winterwear
          </p>

        </div>
      </div>

      </div>
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title  text1={'All'} text2={'Collections'}/>
          {/*product sort*/}
          <select name="" id="" className='border border-gray-300 text-sm px-2' onChange={(e)=>setsortType(e.target.value)}>
            <option value="relavant">Sort by:relavant</option>
            <option value="low-high">Sort by:low-high</option>
            <option value="high-low">Sort by:high-low</option>
          </select>
        </div>
            {/*prduct mapping*/}
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
              {filterProducts.map((item,index)=>(
                <Productitem key={index } id={item._id} name={item.name} price={item.price}  image={item.image}/>
              ))}

            </div>
        </div>
      
     
</div>
    
  )
}

export default Collection