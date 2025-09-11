import Room from "../models/Room.js";
import codeGenerator from "../utils/codeGenerator.js";

export async function createRoom(req, res) {
  try {
    // console.log("creating room");
    // let code;
    // let exists = true;

    // while (exists) {
    //   code = codeGenerator(8);
    //   console.log(code);
    //   exists = await Room.exists({ code });
    // }

    const newRoom = new Room({
      name: req.body.name,
      code: req.body.code,
      members: [
        {
          user: req.user._id,
          role: "admin"
        }
      ],
    });
    console.log("authrnticated user: ", req.user);
    console.log("new room created: ", newRoom);

    await Room.create(newRoom);
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
    // const room = await Room.findOne(req.params.id);
    // if (!room) {
    //   return res.status(404).json({ message: "Room not found" });
    // }
    const roomCode = req.body.code;
    const room = await Room.findOne({ code: roomCode });
    if (!room)
      return res.status(400).json({ message: "Invalid room code" });
    const newMember = {
      user: req.user._id,
      role: "member", //incase i want to have multiple admin in future
    };
    const alreadyMember = room.members.some(
      (member) => member.user.toString() === req.user._id.toString(),
    )
    if(alreadyMember){
      return res.status(400).json({message: "You are already a member of this room"})
    }
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