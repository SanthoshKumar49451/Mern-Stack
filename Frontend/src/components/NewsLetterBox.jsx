import React from 'react'

const NewsLetterBox = () => {
  const onSubmithandler = (e) => {
    e.preventDefault();



  }
  return (
    <div className='text-center'>
      <p className='text-2xl font-medium  text-gray-400 '>Subscribe Now & get 20% off</p>
      <p className='text-gray-400 mt-3'>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate voluptatum sunt quia fuga unde eius necessitatibus aspernatur suscipit, soluta debitis. Exercitationem, voluptatum quidem commodi ad quaerat quam. Quaerat, distinctio quis.
      </p>
      <form action="" className='w-full  sm:w-1/2 flex items-center  gap-3 mx-auto '>
        <input type="email" placeholder='Enter Email' className='w-[50%] sm:flex-1 outline-none py-3 border border-black rounded focus:border-blue-500' required />
        <button type='submit' className='px-5 py-3 bg-black rounded  text-white' onSubmit={onSubmithandler}>Subscribe</button>
      </form>

    </div>
  )
}

export default NewsLetterBox