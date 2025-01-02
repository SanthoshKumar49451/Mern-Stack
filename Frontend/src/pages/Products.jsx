import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Shopcontext } from '../context/Shopcontext';
import { assets } from '../assets/assets/frontend_assets/assets';
import Realted from '../components/Realted';

const Products = () => {
  const { id } = useParams(); // Get product id from URL parameters
  const { products, currency, addToCart } = useContext(Shopcontext); // Get products from context
  const [productData, setProductData] = useState(null); // Store product data
  const [image, setImage] = useState(''); // Store product image URL
  const [size, setSize] = useState(''); // Store selected size

  const fetchData = () => {
    // Find the product with the matching id
    const foundProduct = products.find(item => item._id === id);

    if (foundProduct) {
      setProductData(foundProduct); // Set product data
      if (Array.isArray(foundProduct.image) && foundProduct.image.length > 0) {
        setImage(foundProduct.image[0]); // Set the first image from the array
      } else {
        setImage(foundProduct.image); // If it's a single image URL, set it directly
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, products]); // Run when id or products changes

  // Show loading state or error if no product data found
  if (!productData) {
    return <div>Loading...</div>; // Display loading state if no data found
  }

  return (
    <div className="border-t-3 pt-10 transition-opacity ease-in-out duration-500 opacity-100">
      <div className="flex flex-col sm:flex-row gap-8">
        {/* Product Images Section */}
        <div className="flex flex-col sm:flex-row w-full gap-4">
          {/* Thumbnail Images */}
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible justify-between sm:justify-normal w-full sm:w-1/6">
            {productData.image.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`Product Image ${index + 1}`}
                className="w-[70px] sm:w-[100px] sm:h-[100px] object-cover rounded cursor-pointer"
                onClick={() => setImage(imageUrl)}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="flex justify-center sm:w-3/5">
            <img
              src={image}
              alt="Main Product"
              className="w-full max-w-[500px] h-auto object-contain rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Product Information Section */}
        <div className="sm:w-2/5 flex flex-col justify-between">
          <h1 className="font-medium text-3xl mt-2">{productData.name}</h1>

          {/* Rating Section */}
          <div className="flex items-center gap-1 mt-2">
            {Array(5).fill().map((_, index) => (
              <img
                key={index}
                src={assets.star_icon}
                alt={`Star ${index + 1}`}
                className="w-4"
              />
            ))}
            <p className="pl-3">{123}</p>
          </div>

          {/* Product Price */}
          <p className="mt-5 text-3xl font-medium">{currency} {productData.price}</p>

          {/* Product Description */}
          <p className="text-gray-400 md:w-4/5 mt-4">{productData.description}</p>

          {/* Size Selection */}
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => { setSize(item); }}
                  className={`border py-2 px-4 bg-gray-200 rounded ${item === size ? 'border-orange-400' : ''}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            className="bg-orange-500 px-8 py-3 text-sm rounded active:bg-orange-700"
            onClick={() => addToCart(productData._id, size)}
          >
            Add to Cart
          </button>

          {/* Product Info */}
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 flex flex-col gap-1 font-medium">
            <p>100% original product</p>
            <p>Cash on delivery</p>
            <p>Easy return within 7 Days</p>
          </div>
        </div>
      </div>

      {/* Description and Reviews Tab */}
      <div className="mt-20">
        <div className="px-5 py-3 text-sm flex">
          <p className="border px-5 py-3 text-sm">Description</p>
          <p className="border px-5 py-3 text-sm">Reviews {122}</p>
        </div>
        <div className="flex flex-col px-6 text-sm text-gray-500">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt numquam animi quas porro quos reprehenderit? Magni obcaecati earum, sunt, animi quam id aliquid vitae officiis doloremque, cum laboriosam autem culpa?</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero qui culpa esse soluta iste, non similique incidunt? Quidem dignissimos similique itaque iusto laudantium. Cum reiciendis voluptates quos nihil aliquam porro?</p>
        </div>
      </div>

      {/* Related Products */}
      <div>
        <Realted category={productData.category} subcategory={productData.subCategory} />
      </div>
    </div>
  );
};

export default Products;
