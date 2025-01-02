import { createContext, useEffect, useState } from "react";
import axios from 'axios';

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const Shopcontext=createContext();
const ShopContextprovider=(props)=>{
    const currency='$';
    const delivery_fee=10;
 const backendUrl = import.meta.env.VITE_URL;
    const[search,setSearch]=useState('');
    const[showsearch,setShowsearch]=useState(false)
    const[cartItems,setCartitems]=useState({})
    const navigate=useNavigate();
    const[products,setProducts]=useState([])
    const[token,setToken]=useState('')
    
    
    

const addToCart= async(itemId,size)=>{
    if (!size) {
        toast.error('Select product size')
        return ;
        
    }
    let cartData=structuredClone(cartItems)
    if (cartData[itemId]) {
        if(cartData[itemId][size]) {
           cartData[itemId][size]+=1;
           
            
        }
        else{
            cartData[itemId][size]=1;
        }
        
    }
    else{
        cartData[itemId]={}
        cartData[itemId][size]=1;

    }
    setCartitems(cartData);
    if (token) {
        try {
           await axios.post(backendUrl+'/api/cart/add',{itemId,size},{headers:{token}})
        
            
            
        } catch (e) {
            toast.error(e.message)
            
        }
        
    }


}

const getCartCount=()=>{
    let totalCount=0;
    for (const items in cartItems) {
        for( const item in cartItems[items]){
            try {
                if (cartItems[items][item]>0) {
                    totalCount+=cartItems[items][item]
                    
                }
            } catch (error) {
                toast.error(error.message)
                
            }


        }
        
    }
    return totalCount;
}
const updatedCart= async(itemId,size,quantity)=>{
    let cartData=structuredClone(cartItems)
    cartData[itemId][size]=quantity;
    setCartitems(cartData)
    if (token) {
        try {
            await axios.post(backendUrl+'/api/cart/get',{itemId,size,quantity},{headers:{token}})
           
           
        } catch (error) {
            toast.error(error.message)
                
        }
        
    }

}

const getUser= async(token)=>{

    try {
        const response=  await axios.post( backendUrl+ '/api/cart/get',{},{headers:{token:token}})
      
        
        
        
        if (response.data.success){
            console.log(response.data)
           
            
           
            setCartitems(response.data.cartData)
            
        }
    } catch (error) {
        toast.error(error.message)
                
    }

}
const getTotalAmount=()=>{
    let amount=0;
    for(const items in cartItems){
        let itemInfo=products.find((item)=>item._id===items)

        for(const item in cartItems[items]){
            try {
                if (cartItems[items][item]>0) {
                    amount+=itemInfo.price*cartItems[items][item]
                    
                }
            } catch (error) {
                toast.error(error.message)
                
                
            }
        }
    }
   
return Number(amount);

}

const getProducts=async(token)=>{
    try {
        const response=await axios.get(backendUrl+"/api/product/listproducts")
    
        
      
        
      if (response.data.success) {
        setProducts(response.data.products)
        
      }
      else{
        toast.error(response.data.message)
      }
        
    } catch (error) {
        toast.error(error.message)
        
    }
}
useEffect(()=>{
    getProducts();
},[])

useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
        setToken(storedToken);
    }
}, []);

useEffect(() => {
    async function loadCart() {
        if (token) {
            await getUser(token);
        }
    }
    loadCart();
}, [token]);
    const value={

        products,currency,delivery_fee,search,setSearch,showsearch,setShowsearch,cartItems,addToCart,getCartCount,updatedCart,getTotalAmount,navigate,backendUrl,token,setToken,setCartitems
    }
    return (
        <Shopcontext.Provider value={value}>
        {props.children}
    </Shopcontext.Provider>
    )
   
}
export default ShopContextprovider;
