


import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoute.js';

// App config
const app = express();
const port = 3183;
connectDb();
connectCloudinary();

// Middlewares
app.use(express.json())
app.use(cors())
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

// Endpoints
app.get('/', (req, res) => {
    res.send('app working')
})
app.get('/api',(req,res)=>{
    res.send('rudra')
})


// Corrected listen method
app.listen(port)