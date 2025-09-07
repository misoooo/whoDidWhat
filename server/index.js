import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Task from "./models/Task.js";
import User from "./models/User.js";
import taskRouter from "./routes/tasks.js";
import roomRouter from "./routes/rooms.js";
import auth from "./routes/auth.js"

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://admin:qV!Y.js6abvJ78u@whodidwhat.wlksoiq.mongodb.net/?retryWrites=true&w=majority&appName=whoDidWhat"
);

const db = mongoose.connection;
db.once("open", () => console.log("Connected to the database!"));

app.get("/api/users", async (req, res) =>{
  const users = await User.find();
  console.log("fetched user data index:", users);
  res.json(users)
});

app.get("/api/tasks", async (req, res) => {
  const tasks = await Task.find();
  console.log("fetched data:", tasks);
  res.json(tasks);
});

app.use("/api/tasks", taskRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/auth", auth);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});