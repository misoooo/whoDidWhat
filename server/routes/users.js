import express from "express"
const router = express.Router();

import User from "../models/User.js"

router.get("/", async(req, res)=>{
  try{
    const users = await User.find();
    res.json(users);
    console.log("fetchced user data:", users);
  }catch(err){
    res.status(400).json({message: err.message})
  }
})

router.post("/", async(req, res)=>{
  try{
  const user = new User({
    name: req.body.name,
    email: req.body.email
  })
  }catch(err){
    res.status(500).json({message: err.message})
  }
})

module.exports = router;