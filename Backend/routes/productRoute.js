import express from "express";
import { addProduct,removeProduct,listProducts,singleProduct } from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminauth from "../middleware/adminauth.js";
const productRouter=express.Router();


productRouter.post('/add',adminauth,upload.fields([{name:"image1",maxCount:1},{name:"image2",maxCount:1},{name:"image3",maxCount:1},{name:"image4",maxCount:1}]),addProduct)
productRouter.post('/single',singleProduct)
productRouter.post('/remove',adminauth,removeProduct)
productRouter.get('/listproducts',listProducts)
export default productRouter;