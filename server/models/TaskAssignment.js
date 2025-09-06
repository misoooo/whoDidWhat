import mongoose from "mongoose";

const taskAssignmentSchema = new mongoose.Schema({
  task: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  dueDate: { type: Date },
  status: { type: String, enum: ["pending", "done"], default: "pending" },
  completedAt: { type: Date }
}, { timestamps: true });

export default mongoose.model("TaskAssignment", taskAssignmentSchema);