import { useEffect, useState } from "react";
import axios from "axios";
import TaskItem from "../components/TaskItem";

export default function TaskPage() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get("https://your-api-url.com/api/tasks")
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => {
                console.error("Error fetching tasks:", error);
            });
    }, []);

    return (
        <div className="p-4">
            {tasks.map(task => (
                <TaskItem
                    key={task._id}
                    title={task.title}
                    assignee={task.assignedTo}
                    doneBy={task.doneBy}
                />
            ))}
        </div>
    );
}
