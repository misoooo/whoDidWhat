import mongoose from "mongoose";

const roomMemberSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  role: { type: String, enum: ["admin", "member"], default: "member" }
});

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [roomMemberSchema], // embed subdocs
  code: { type: String, required: true, unique: true }
}, { timestamps: true });

export default mongoose.model("Room", roomSchema);