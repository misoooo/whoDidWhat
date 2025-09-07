import User from "../models/User.js"

export const getUsers = async(req, res)=>{
  try {
    const users = await User.find().populate("rooms.roomId", "name code");
    res.json(users);
    console.log("Fetched user data:", users);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export const createUser = async(req, res)=>{
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      passwordHash: req.body.passwordHash, // hash later in auth
      rooms: req.body.rooms || [] // optional, defaults to empty array
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}