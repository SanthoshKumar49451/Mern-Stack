import React from 'react'
import { useEffect } from 'react';
import axios from 'axios'
import { useState } from 'react';
import { toast } from 'react-toastify'
import { assets } from '../assets/assets.js'
import {currency} from '../App.jsx'

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const fetchAllOrders = async () => {
    if (!token) {
      return null;

    }
    try {
      const response = await axios.post('http://localhost:3183/api/order/list', {}, { headers: { token: token } })
      console.log(response.data);



      if (response.data.sucess) {
        setOrders(response.data.orders)

      }
      else {
        toast.error(response.data.message)
      }
    



    } catch (error) {
      toast.error(error.message)

    }

  }
  const statusHandler=async(e,orderId)=>{
    console.log(e.target.value);
    
    try {
      const response=await axios.post('http://localhost:3183/api/order/status',{orderId,status:e.target.value.trim()},{headers:{token:token}})
      console.log(response);
      if (response.data.sucess) {
        await fetchAllOrders();
        
      }
      
    } catch (error) {
      console.log(error);
      toast.error(response.data.message)
      
      
    }


  }
  useEffect(() => {
    fetchAllOrders();
  }, [token])

  return (
    <div>
      <h3>Orders page</h3>
      {orders.map((order) => (
        <div key={order._id} className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 item-start p-5 md:p-8 md:my-4 sm:text-sm text-gray-700 border rounded'>
          <img className='w-12'  src={assets.parcel_icon} alt="" />
          <div>

            <div >
              {order.items?.map((item, index) => (
                <p key={index} className="text-gray-700 py-0.5">
                  {item.name} × {item.quantity}
                  {item.size && <span>{item.size}</span>}
                </p>
              ))}
              <p >Amount: ${order.amount}</p>
            </div>
            <p className='mt-3 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>
            <div>
              <p>{order.address.street + " "}</p>
              <p>{order.address.city + ',' + order.address.state + ',' + order.address.country + "," + order.address.zipcode}</p>
            </div>
            <p>{order.address.phone}</p>
          </div>
          <div>
            <p className='text-sm sm:text-[15px]'>items:{order.items.length}</p>
            <p className='mt-3 '>Method:{order.paymentMethod}</p>
            <p>payment:{order.payment?"Done":"Pending"}</p>
            <p>Date:{new Date(order.date).toDateString()}</p>
            <p></p>
          </div>
          <p className='text-sm sm:text-[15px]'>
          {
            currency
          }{order.amount}
          </p>
          <select onChange={(e)=>statusHandler(e,order._id)
          } value={order.status} className='px-2 py-1 w-40 h-8 border rounded-md bg-white text-gray-700 text-sm hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer'>
            <option value="orderPlaced"> orderPlaced</option>
            <option value="Packing">Packing</option>
            <option value="Shipped">Shipped</option>
            <option value="Out for Delievery">Out for Delievery</option>
            <option value="Delievered">Delievered</option>
          </select>
        </div>
      ))}

    </div>
  )
}

export default Orders