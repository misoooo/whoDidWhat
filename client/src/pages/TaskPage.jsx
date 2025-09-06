import { useEffect, useState } from "react";
import axios from "axios";
import TaskItem from "../components/TaskItem";
import Header from "../components/Header";
import InputTask from "../components/InputTask";
import Options from "../components/Options";

// axios.get("http://localhost:5000/api/tasks");

export default function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch tasks first
        const tasksRes = await axios.get(
          "https://11566182-3c07-424d-93fa-58cd18b332b8-00-5k32tb2of67a.picard.replit.dev:5000/api/tasks",
        );
        setTasks(tasksRes.data);

        // Then fetch users
        const usersRes = await axios.get(
          "https://11566182-3c07-424d-93fa-58cd18b332b8-00-5k32tb2of67a.picard.replit.dev:5000/api/users",
        );
        setUsers(usersRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const getUserName = (userID) => {
    const user = users.find((user) => user._id === userID);
    return user ? user.name : "Unknown";
  };

  const [isTaskPopup, setIsTaskPopup] = useState(false);

  return (
    <>
      <Header/>
      {/* <InputTask setTasks={setTasks} /> */}
      {isTaskPopup ? (
        <InputTask
          isTaskPopup={isTaskPopup}
          setTasks={setTasks}
          closePopup={() => setIsTaskPopup(false)}
        />
      ) : (
        <button
          onClick={() => setIsTaskPopup(true)}
          className="flex items-center justify-center mt-8 ml-6 w-2/3 max-w-[700px] sm:mx-auto bg-blue-500 text-white text-lg rounded-xl px-4 py-4 hover:bg-blue-700 transition duration-200"
        >
          Add A Task
        </button>
      )}
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 flex items-center justify-center">Tasks</h1>
        <Options text="some text" />
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
