import React from "react";
import TaskList from "../components/TaskList";
import { dummyTasks } from "../assets/dummyData";

const TaskPage = () => {
  
  return (
    <div>
      {dummyTasks.map((task)=><TaskList task = {task}/>)}
    </div>
  );
};

export default TaskPage;
