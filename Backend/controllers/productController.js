import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";



//Add a product
const addProduct=async(req,res)=>{
    
try {
    const{name,description,price,category,subCategory,sizes,bestSeller}=req.body;
    const image1= req.files.image1&&req.files.image1[0];
    const image2=  req.files.image2&&req.files.image2[0]
    const image3=  req.files.image3&&req.files.image3[0]
    const image4=  req.files.image4&&req.files.image4[0]
   const images=[image1,image2,image3,image4].filter((item)=>item!==undefined)
   let imagesUrl=await Promise.all(
    images.map(async (item)=>{
        const result=await cloudinary.uploader.upload(item.path,{resource_type:'image'})
        return result.secure_url
    })
   )
  

   const productData={
    name,
    description,
    category,
    price:Number(price),
    subCategory,
    bestSeller:bestSeller=='true'?true:false,
    sizes:JSON.parse(sizes),
    image:imagesUrl,
    date:Date.now()

   }
   const product=new productModel(productData)
   await product.save()
    res.json({success:true,message:"added"})
    

} catch (error) {
    console.log(error);
    
    res.json({success:false,message:error.message})
    
}

}

//listProducts
const listProducts=async(req,res)=>{

    try {
        const products=await productModel.find()
        console.log(products)
        res.json({
            success:true,
            message:"list",
            products
        })
    } catch (e) {
        res.json({
            success:false,
            message:"e.message"
        })
    
        
    }


}
//Remove product
const removeProduct=async(req,res)=>{
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({
            success:true,
            message:"removed"
        })
    } catch (error) {
        res.json({
            success:false,
            message:"e.message"
        })

        
    }


}
//single productInfo
const singleProduct=async(req,res)=>{


    try {

        const{id}=req.body;
        const product=await productModel.findById(id)
        res.json({
              success:true,
              product
        

        })
  
        
    } catch (error) {
        res.json({
            success:false,
            message:"e.message"
        })

        
    }



}

export {addProduct,listProducts,singleProduct,removeProduct}


