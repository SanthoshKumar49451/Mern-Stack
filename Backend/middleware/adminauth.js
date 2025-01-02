import jwt from "jsonwebtoken";



const adminauth=async(req,res,next)=>{
    console.log('hello')

try {
    const {token}=req.headers;
    if (!token) {
        return res.json({
            success:false,
            message:"not Authorized Log in again"
        })

      


        
    }
    const encode=jwt.verify(token,process.env.JWT_SECRET)
    if (encode!==process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD) {
        return res.json({
            success:false,
            message:" encode Authorized Log in again"
        })
    }
    next();
} catch (error) {
    console.log(error)

    res.json({
        success:false,
        message:error.message
    })
    
}





}


export default adminauth;