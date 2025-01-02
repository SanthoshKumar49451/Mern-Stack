//add products

import userModel from "../models/userModel.js";


const addToCart=async(req,res)=>{
    try {
        const{userId,itemId,size}=req.body;
        const userData=await userModel.findById(userId)
        let cartData=await userData.cartData;
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
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

        await userModel.findByIdAndUpdate(userId,{cartData})
        res.json({success:true,message:"added"})

    } catch (error) {
        res.json({success:false,message:error.message})
        
    }

}
//update cart
const updateCart=async(req,res)=>{

    try {
        const {userId,itemId,size,quantity}=req.body;
        const userData=await userModel.findById(userId)
        let cartData=await userData.cartData;
        cartData[itemId][size]=quantity;
        await userModel.findByIdAndUpdate(userId,{cartData})
        res.json({success:true,message:"Updated"})


    } catch (error) {
        res.json({success:false,message:error.message})
        
    }

}
//get User cart data
const getUserCart=async(req,res)=>{
    try {
       const{token}=req.headers

        const userData=await userModel.findOne(token);
        let cartData=await userData.cartData;
        res.json({sucess:true,cartData})
        console.log(cartData)
        

    } catch (error) {
        res.json({success:false,message:error.message})
        
    }

}


export {addToCart,updateCart,getUserCart}