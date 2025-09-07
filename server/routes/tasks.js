import express from "express";
import {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", createTask);
router.get("/", getTasks);
router.patch("/:id", updateTaskStatus);
router.delete("/:id", deleteTask);

export default router;