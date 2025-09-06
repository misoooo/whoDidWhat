import Room from "../models/Room.js";
import codeGenerator from "../utils/codeGenerator.js";

export async function createRoom(req, res) {
  try {
    console.log("creating room");
    let code;
    let exists = true;

    while (exists) {
      code = codeGenerator(8);
      exists = await Room.exists({ code });
    }

    const newRoom = new Room({
      name: req.body.name,
      code,
      members: [req.user._id], //check
      admin: req.user._id,
    });

    await newRoom.save();
    res.status(201).json(newRoom);
    console.log("room created successfully");
    console.log(newRoom);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function joinRoom(req, res) {
  try {
    const room = await Room.findByID(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    const roomCode = req.body.roomCode;
    if (roomCode !== room.roomCode)
      return res.status(400).json({ message: "Invalid room code" });
    const newMember = {
      user: req.body.user,
      role: "member", //incase i want to have multiple admin in future
    };
    room.members.push(newMember);
    await room.save();
    res.status(201).json(room);
    console.log(room);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function leaveRoom(req, res) {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    const memberIndex = room.members.findIndex(
      (member) => member._id.toString() === req.params.membersId,
    );
    if (memberIndex === -1) {
      return res.status(404).json({ message: "Member not found" });
    }

    //later on implement some other ideas for admin to leave the room
    if (room.members[memberIndex].role === "admin") {
      return res.status(400).json({ message: "Admin cannot leave the room" });
    }
    room.members.splice(memberIndex, 1);
    await room.save();
    res.status(200).json(room);
    console.log(room);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function deleteRoom(req, res) {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    await room.remove();
    res.status(200).json({ message: "Room deleted successfully" });
    console.log("room deleted successfully");
    console.log(room);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function modifyRoom(req, res) {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    room.name = req.body.name; //modify this later for furthur changes
    await room.save();
    res.status(200).json(room);
    console.log(room);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}