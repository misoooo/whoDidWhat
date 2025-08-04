
// import mongoose from "mongoose";
// import cors from "cors";

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://admin:qV!Y.js6abvJ78u@whodidwhat.wlksoiq.mongodb.net/?retryWrites=true&w=majority&appName=whoDidWhat",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

const db = mongoose.connection;
db.once("open", () => console.log("Connected to the database!"));

// import Task from "./models/Task.js";
const Task = require("./models/Task.js")
// import User from "./models/User.js";
const User = require("./models/User.js")

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


// import taskRouter from "./routes/tasks.js"
const taskRouter = require("./routes/tasks.js")
app.use("/api/tasks", taskRouter);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
