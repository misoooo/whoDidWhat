import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  members: [
    {
      user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      role:{
        type: String,
        enum: ["admin", "member"],
        default: "member"
      }
    }
  ]
});

const Room = mongoose.model("Room", roomSchema);

export default Room;