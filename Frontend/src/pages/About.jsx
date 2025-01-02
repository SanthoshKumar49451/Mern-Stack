import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets/frontend_assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'About'} text2={"Us"} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={assets.about_img} alt="" className='w-full md:max-w-[450px]' />
        <div className='flex flex-col gap-6 justify-center md:w-2/4 text-gray-600'>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni dolores ut, saepe soluta modi, ullam illum officia illo ipsum dolore voluptatibus voluptatem explicabo aliquid alias quidem beatae id unde iste!</p >
          <p className='text-gray-600'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint, est ea, eum omnis asperiores consectetur voluptates velit aspernatur doloremque aliquam similique vitae placeat illo! Aperiam expedita culpa alias quo excepturi.
          </p >
          <b className='text-gray-800'>Our Mission</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates velit eveniet aliquam eius? Natus ea quo ipsum fugiat quos quis inventore ad eligendi aliquam. Suscipit quae ullam qui natus? Rerum!</p >
        </div>




      </div>
      <div className='text-xl py-4'>
        <Title text1={'Why'} text2={"Choose Us"} />
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20 gap-4'>

        <div className='border px-10 py-8 flex flex-col gap-5'>

          <b>Quality Assurance</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore eveniet velit laudantium nesciunt itaque doloribus obcaecati, ipsum aperiam. Saepe distinctio, consequatur aliquid ab cumque quo similique officia doloribus repudiandae. Voluptatibus.
          </p>

        </div>
        <div className='border px-10 py-8 flex flex-col gap-5'>

          <b>Convenience</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore eveniet velit laudantium nesciunt itaque doloribus obcaecati, ipsum aperiam. Saepe distinctio, consequatur aliquid ab cumque quo similique officia doloribus repudiandae. Voluptatibus.
          </p >

        </div>
        <div className='border px-10 py-8 flex flex-col gap-5'>

          <b>Expectional Customer Service</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore eveniet velit laudantium nesciunt itaque doloribus obcaecati, ipsum aperiam. Saepe distinctio, consequatur aliquid ab cumque quo similique officia doloribus repudiandae. Voluptatibus.
          </p >

        </div>
      </div>
      <NewsLetterBox/>
    </div>
  )
}

export default About