import express from "express";
import Room from "../models/Room.js";
import { createRoom, joinRoom, leaveRoom, deleteRoom, modifyRoom } from "../controllers/roomController.js";
import { authenticate } from "../middleware/auth.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
    console.log(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//create room
router.post("/", authenticate, createRoom);

//member joining room/ add member to room
router.post("/join", authenticate, joinRoom);

//delete member from room
router.delete("/:id/members/:membersId", leaveRoom);

//delete room
router.delete("/:id", deleteRoom);

//modify room
router.patch("/:id", modifyRoom);

export default router;