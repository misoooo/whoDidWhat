import mongoose from "mongoose";

// const taskSchema = new mongoose.Schema({
//   room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
//   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   description: { type: String, required: true },
//   taskType: { type: String, enum: ["single", "rotated"], required: true },
// }, { timestamps: true });

const taskSchema = new mongoose.Schema(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["normal", "rotating"],
      default: "normal",
    },
    status: {
      type: String,
      enum: ["pending", "done"],
      default: "pending",
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // For normal tasks
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // For rotating tasks
    assignedToList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    currentAssignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    rotationIndex: {
      type: Number,
      default: 0,
    },

    // Common
    doneBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

export default mongoose.model("Task", taskSchema);