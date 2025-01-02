import userModel from "../models/userModel.js";
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config();

const createToken= (id)=>{
    const token= jwt.sign({id},process.env.JWT_SECRET)

 return token;

}

//Route for userLogin
const loginUser=async(req,res)=>{
    try {
        const{email,password}=req.body;
       const user= await userModel.findOne({email})
       if(!user){
        return res.json({success:false,msg:"user doesnt exists"})
        

       }

       const isMatch=await bcrypt.compare(password,user.password);
       if(isMatch){
        const token=createToken(user._id)
        res.json({success:true,token})
       }
       else{
        res.json({success:false,message:"invalid ceredentials"})
       }
    } catch (error) {
        
    }

}
//route for userRegistration
const registerUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Check if user already exists
      const exists = await userModel.findOne({ email });
      if (exists) {
        return res.json({ success: false, msg: "User already exists" });
      }
  
      // Validate email and password
      if (!validator.isEmail(email)) {
        return res.json({ success: false, message: "Please enter a valid email" });
      }
      if (password.length < 8) {
        return res.json({ success: false, message: "Password must contain at least 8 characters" });
      }
  
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create new user
      const newUser = new userModel({
        name,
        email,
        password: hashedPassword,
      });
  
      // Save the user to the database
      const user = await newUser.save();
  
      // Generate a JWT token
      const token = createToken(user._id);  // Assuming createToken is defined properly
  
      // Return the token in the response
      res.json({ success: true, token });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
  const adminLogin=async(req,res)=>{
    try {
       const{email,password}=req.body;
       if (email===process.env.ADMIN_EMAIL&&password===process.env.ADMIN_PASSWORD) {
        const token=jwt.sign(email+password,process.env.JWT_SECRET)
        res.json({
            success:true,
            token
        })
       
        }
        else{
            res.json({
                success:false,
                message:'invalid cerendtials'
                
            })
        
       } 
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
        
    }

}


export {loginUser,registerUser,adminLogin}