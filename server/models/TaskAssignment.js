const mongoose = require("mongoose");
const Task = require("./Task");
const User = require("./User");

const taskAssignmentSchema = new mongoose.Schema({
  task: { type: mongoose.Schema.Types.ObjectId, ref: Task, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
  dueDate: { type: Date },
  status: { type: String, enum: ["pending", "done"], default: "pending" },
  completedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model("TaskAssignment", taskAssignmentSchema);