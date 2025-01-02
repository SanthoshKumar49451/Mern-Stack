import React, { useContext, useEffect, useState } from 'react';
import { Shopcontext } from '../context/Shopcontext';
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {
  const { token, currency ,backendUrl} = useContext(Shopcontext);
  const [orderData, setOrderdata] = useState([]);

  // Load all order data
  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backendUrl+ '/api/order/userorders',
        {},
        { headers: { token: token } }
      );

      if (response.data.success) {
        let allOrders = [...response.data.orders];
        console.log(allOrders);

        // Set the order data after processing the response
        setOrderdata(allOrders.reverse());
      } else {
        console.error('Error fetching orders:', response.data.message);
      }
    } catch (error) {
      console.error('Error loading order data:', error);
    }
  };

  // Fetch order data when the token is available or updated
  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16 p-2">
      <div className="text-2xl">
        <Title text1={'My'} text2={'Orders'} />
      </div>
      <div>
        {orderData.map((order, index) => (
          // Loop through all items in each order
          order.items.map((item, itemIndex) => (
            <div key={`${index}-${itemIndex}`} className="py-4 border-t border-b text-gray-700 flex flex-col sm:flex-row gap-4 ">
              {/* Add first image from the item's image array */}
              <div className="flex items-start gap-6 text-sm">
                <img src={item.image[0]} alt={item.name} className="w-16 sm:w-20" />
                <div>
                  <p className="sm:text-base font-medium">{item.name}</p>
                  <div className="flex items-center gap-3 mt-2 text-base text-gray-500">
                    <p>{currency}{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className="mt-3">Date: <span className="text-gray-400">{new Date(order.date).toDateString()}</span></p>
                  <p className="mt-3">Payment: {item.paymentMethod}</p>
                </div>
                <div className="justify-between">
                  <div className="flex items-center gap-2">
                    <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                    <p className="text-sm sm:text-base">{order.status}</p>
                  </div>
                </div>
                <button
                  onClick={loadOrderData} // Re-fetch data when clicking "Track Order"
                  className="border border-1 rounded px-5 py-2"
                >
                  Track Order
                </button>
              </div>
            </div>
          ))
        ))}
      </div>
    </div>
  );
};

export default Orders;
