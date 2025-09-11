import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js"

dotenv.config();

export const authenticate = async(req, res, next)=>{
  const authHeader = req.headers.authorization;
  if(!authHeader || !authHeader.startsWith("Bearer ")){
    return res.status(401).json({message: "No token provided"});
  }

  const token = authHeader.split(" ")[1];
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.userId);
    if(!user){
      return res.status(401).json({message: "Invalid token or User not found"});
    }
    req.user = user;
    next();
  }catch(err){
    console.error("Error verifying token:", err);
    res.status(401).json({message: "Invalid token"});
  }
}