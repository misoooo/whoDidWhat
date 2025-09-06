import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  description: { type: String, required: true },
  taskType: { type: String, enum: ["single", "rotated"], required: true },
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);