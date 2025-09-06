import express from "express";
const router = express.Router();
import Task from "../models/Task.js";

router.post("/", async (req, res) => {
  try {
    const task = new Task({
      name: req.body.name,
      assignedTo: req.body.assignedTo,
      assignedBy: req.body.assignedBy,
      doneBy: req.body.doneBy,
    });
    await task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "name")
      .populate("assignedBy", "name")
      .populate("doneBy", "name");
    res.send(tasks);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;