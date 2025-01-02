import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe'

//globalcurre
const currency='USD';
const delieveryCharges=10

//gateway initalize

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)


//Cash On Delievey


const placeOrderCod=async(req,res)=>{
    try {
        const {userId,items,amount,address}=req.body;
        const orderData={
            userId,
            items,
            amount,
            address,
            paymentMethod:"COD",
            payment:false,
            date:Date.now()

        }


        const newOrder=new orderModel(orderData)

        await newOrder.save();

        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({success:true,message:"orderPlaced"})



    } catch (error) {

        res.json({
            success:false,
            message:error.message
        })
        
    }

}

//Razorpay


const placeOrderRazorpay=async(req,res)=>{

}
//verify stripe
const verifyStripe=async(req,res)=>{
    const{orderId,success,userId}=req.body;
    try {
        if (success==="true") {
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            res.json({
                success:true
            })
        }
        else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({
                success:false
            })
        }
       
      
    }catch (e) {
        res.json({
            success:false,
            message:e.message
        })}
}

//Stripe


const placeOrderStripe=async(req,res)=>{
    try {
        const {userId,items,amount,address}=req.body;
        const{origin}=req.headers;
        const orderData={
            userId,
            items,
            amount,
            address,
            paymentMethod:"Stripe",
            payment:false,
            date:Date.now()

        }
        const newOrder=new orderModel(orderData)

        await newOrder.save();
        const line_items=items.map((item)=>(
            {
                price_data:{
                    currency:currency,
                    product_data:{
                        name:item.name,

                    },
                    unit_amount:item.price*100,


                },
                quantity:item.quantity

            }
        ))

line_items.push({
    price_data:{
        currency:currency,
        product_data:{
            name:"delieveryCharges"

        },
        unit_amount:delieveryCharges*100,


    },
    quantity:1


})

const session=await stripe.checkout.sessions.create({
    success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
    cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
    line_items,
    mode:"payment"
})
res.json({
    success:true,session_url:session.url
})

    } catch (e) {
        res.json({
            success:false,
            message:e.message
        })
        
    }

}

//All orders data on Admin panel



const allOrders=async(req,res)=>{
    try {
        const orders=await orderModel.find({})
        res.json({
            sucess:true,
            orders
        })
    } catch (e) {
        res.json({
            success:false,
            message:e.message
        })
        
    }

}

//data for Frontend


const userOrders=async(req,res)=>{
    try {
        const {userId}=req.body;
        const orders= await orderModel.find({userId})
        res.json({success:true,orders})
    } catch (error) {
        res.json({success:false,message:error.message})
        
    }

}

//update Status
const updateStatus=async(req,res)=>{
    try {
        const {orderId,status}=req.body;
        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({
            success:true,
            message:"updated"
        })





    }catch (error) {
        res.json({success:false,message:error.message})
        
    }
        
    
}

export {placeOrderCod,placeOrderRazorpay,placeOrderStripe,allOrders,userOrders,updateStatus,verifyStripe}
