import Task from "../models/Task.js";

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { description, type, assignedBy, assignedTo, assignedToList, roomId } = req.body;

    // Validation depending on type
    if (type === "normal" && !assignedTo) {
      return res.status(400).json({ error: "Normal task must have assignedTo" });
    }

    if (type === "rotating" && (!assignedToList || assignedToList.length === 0)) {
      return res.status(400).json({ error: "Rotating task must have assignedToList" });
    }

    const task = new Task({
      roomId,
      description,
      type,
      status: "pending",
      assignedBy,
      assignedTo: type === "normal" ? assignedTo : null,
      assignedToList: type === "rotating" ? assignedToList : [],
      currentAssignee: type === "rotating" ? assignedToList[0] : null,
      rotationIndex: type === "rotating" ? 0 : null,
      doneBy: null,
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all tasks for a room
export const getTasks = async (req, res) => {
  try {
    const { roomId } = req.query; // pass roomId as query param
    const filter = roomId ? { roomId } : {};

    const tasks = await Task.find(filter)
      .populate("assignedBy", "name")
      .populate("assignedTo", "name")
      .populate("assignedToList", "name")
      .populate("currentAssignee", "name")
      .populate("doneBy", "name");

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update task status
export const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, doneBy } = req.body;

    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    task.status = status || task.status;
    task.doneBy = doneBy || task.doneBy;
    task.updatedAt = new Date();

    // If rotating task and marked done → rotate
    if (task.type === "rotating" && status === "done") {
      task.rotationIndex = (task.rotationIndex + 1) % task.assignedToList.length;
      task.currentAssignee = task.assignedToList[task.rotationIndex];
      task.status = "pending"; // reset for next person
    }

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);

    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};