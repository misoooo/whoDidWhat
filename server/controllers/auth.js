import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "../models/User.js";

dotenv.config();

export const signup = async(req, res)=>{
  try{
    const {name, email, password} = req.body;
    console.log("data received for signup: ", name, email, password);
    const existingUser = await User.findOne({email});
    if(existingUser){
      return res.status(400).json({message: "User already exists"});
    }
    const hashedPassword = await bcrypt.hash(password,10);

    const newUser = new User({
      name,
      email,
      passwordHash: hashedPassword
    });
    console.log("new user created: ", newUser);
    await newUser.save();

    const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET_KEY, {expiresIn: "7d"});
    console.log("token generated: ", token);
    res.status(201).json({token});
  }catch(err){
    console.error("Error during signup:", err);
    res.status(500).json({message: err.message});
  }
}

export const login = async(req, res)=>{
  try{
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(!user){
      return res.status(400).json({message: "Invalid credentials"});
    }

    if(!user.passwordHash){
      console.log("user has no passwordHash");
      return res.status(400).json({message: "Invalid credentials"});
    }
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if(!isMatch) {
      console.log("invalid credentials, user didnt match")
      return res.status(400).json({message: "Invalid credentials"});
    }
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: "7d"});
    console.log("user authenticated, token generated: ", token)
    res.status(200).json({token});
  }catch(err){
    console.log("Error during login:", err);
    res.status(500).json({message: err.message});
  }
}