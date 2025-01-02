import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Men')
  const [bestSeller, setBestseller] = useState(false)
  const [subcategory, setSubcategory] = useState("Topwear")
  const [sizes, setSizes] = useState([])

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name)
      formData.append("description", desc)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subcategory)
      formData.append("bestSeller", String(bestSeller))
      formData.append("sizes", JSON.stringify(sizes))

      if (image1) formData.append("image1", image1)
      if (image2) formData.append("image2", image2)
      if (image3) formData.append("image3", image3)
      if (image4) formData.append("image4", image4)

      // For debugging
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } })
      
      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDesc('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
        setSizes([])  // Reset sizes
      } else {
        toast.error(response.data.message)
      }
    } catch (e) {
      toast.error(e.message)
    }
  }

  return (
    <form className='flex flex-col w-full items-start gap-3 ' onSubmit={onSubmitHandler}>
      <div>
        <p className='mb-3 '>Upload Images</p>
        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="image1" />
            <input type="file" id="image1" onChange={(e) => setImage1(e.target.files[0])} hidden />
          </label>
          <label htmlFor="image2">
            <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="image2" />
            <input type="file" id="image2" hidden onChange={(e) => setImage2(e.target.files[0])} />
          </label>
          <label htmlFor="image3">
            <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="image3" />
            <input type="file" id="image3" hidden onChange={(e) => setImage3(e.target.files[0])} />
          </label>
          <label htmlFor="image4">
            <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="image4" />
            <input type="file" id="image4" hidden onChange={(e) => setImage4(e.target.files[0])} />
          </label>
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product Name</p>
        <input
          className='w-full max-w-[500px] px-3 py-2'
          type="text"
          placeholder='Type Here...'
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product Description</p>
        <textarea
          className='w-full max-w-[500px] px-3 py-2'
          placeholder='Write Description'
          required
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
        />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product Category</p>
          <select className='w-full px-3 py-2' onChange={(e) => setCategory(e.target.value)} value={category}>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Sub Category</p>
          <select className='w-full px-3 py-2' onChange={(e) => setSubcategory(e.target.value)} value={subcategory}>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Product Price</p>
          <input
            type="number"
            placeholder='Price'
            className='w-full px-3 py-3 sm:w-[120px]'
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>
      </div>

      <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-3'>
          {["S", "M", "L"].map((size) => (
            <div key={size} onClick={() => setSizes(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size])}>
              <p className={`${sizes.includes(size) ? "bg-pink-300" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>{size}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='flex gap-3 mt-3'>
        <input
          type="checkbox"
          id="bestSeller"  // Ensure this ID matches the htmlFor
          onChange={() => setBestseller(prev => !prev)}
          checked={bestSeller}  // Set checkbox checked based on state
        />
        <label className='cursor-pointer' htmlFor="bestSeller">Add to Bestseller</label>
      </div>

      <button type="submit" className='w-28 bg-black py-4 mt-3 rounded-sm text-white'>Add</button>
    </form>
  )
}

export default Add
