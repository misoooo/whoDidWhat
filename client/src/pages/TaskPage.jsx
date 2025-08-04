import { useEffect, useState } from "react";
import axios from "axios";
import TaskItem from "../components/TaskItem";
import Header from "../components/Header";
import InputTask from "../components/InputTask";

axios.get("http://localhost:5000/api/tasks");

export default function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try{
      const [usersRes, tasksRes] = await Promise.all([
        axios.get(
          "https://11566182-3c07-424d-93fa-58cd18b332b8-00-5k32tb2of67a.picard.replit.dev:5000/api/users",
        ),
        axios.get(
          "https://11566182-3c07-424d-93fa-58cd18b332b8-00-5k32tb2of67a.picard.replit.dev:5000/api/tasks",
        )
      ]);
      console.log(tasksRes.data);
      console.log(usersRes.data);
      
      setUsers(usersRes.data);
      setTasks(tasksRes.data);
    }catch(err){
        console.error("Error fetching data:", err);
    }
      fetchData();
    };
  }, []);

  const getUserName = (userID) => {
    const user = users.find((user) => user._id === userID);
    return user ? user.name : "Unknown";
  };

  return (
    <>
      <Header />
      <InputTask />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Tasks</h1>
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            title={task.name}
            assignedTo={getUserName(task.assignedTo)}
            doneBy={getUserName(task.doneBy)}
          />
        ))}
      </div>
    </>
  );
}
