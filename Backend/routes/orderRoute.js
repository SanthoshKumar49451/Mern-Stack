import express from 'express'
import {placeOrderCod,placeOrderRazorpay,placeOrderStripe,allOrders,userOrders,updateStatus,verifyStripe} from '../controllers/ordercontrollers.js'
import adminauth from '../middleware/adminauth.js'
import authUser from '../middleware/auth.js'

const orderRouter=express.Router()
//Admin
orderRouter.post('/list',adminauth,allOrders)
orderRouter.post('/status',adminauth,updateStatus)

//user
orderRouter.post('/place',authUser,placeOrderCod)
orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)


//userfeature
orderRouter.post('/userorders',authUser,userOrders)

//verify 
orderRouter.post('/verify',authUser,verifyStripe)

export default orderRouter





