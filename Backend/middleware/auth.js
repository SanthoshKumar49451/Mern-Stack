import jwt from 'jsonwebtoken'














const authUser=(req,res,next)=>{
    const {token}=req.headers;
    if (!token) {
        return res.json({success:false,message:"not Authorized"})
        
    }
    try {
        const token_decode=jwt.verify(token,process.env.JWT_SECRET)
        req.body.userId=token_decode.id
        next();


    } catch (error) {
        res.json({success:false,message:error.message})
        
    }

}


export default authUser;