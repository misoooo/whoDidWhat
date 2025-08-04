const mongoose = require("mongoose");
const User = require("./User.js")

const taskSchema = new mongoose.Schema({
    name: {type: String, required: true},
    assignedTo: {type: mongoose.Schema.Types.ObjectId, ref: User},
    assignedBy: {type: mongoose.Schema.Types.ObjectId, ref: User},
    doneBy: {type: mongoose.Schema.Types.ObjectId, ref: User}
})

module.exports = mongoose.model("Task", taskSchema)