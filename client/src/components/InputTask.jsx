import React, { useEffect, useState } from "react";

const InputTask = ({setTasks, closePopup}) => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [assignedBy, setAssignedBy] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [doneBy, setDoneBy] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://11566182-3c07-424d-93fa-58cd18b332b8-00-5k32tb2of67a.picard.replit.dev:5000/api/users",
        );
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const taskData = {
      name,
      assignedTo,
      assignedBy,
      doneBy: "6890ff0fd3d637054979cd54",
    };
    console.log(taskData);
    console.log(JSON.stringify(taskData));

    try {
      const response = await fetch(
        "https://11566182-3c07-424d-93fa-58cd18b332b8-00-5k32tb2of67a.picard.replit.dev:5000/api/tasks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(taskData),
        },
      );

      if (response.ok) {
        console.log("task created successfully");
        setName("");
        setAssignedBy("");
        setAssignedTo("");
        // setDoneBy("");
      } else {
        console.error("failed to create task");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally{
      closePopup();
    }
  };

  const handleCancel = () => {
    console.log("cancel clicked");
    closePopup();
    console.log("cancel clicked again");
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white border border-black rounded-xl stroke-2 mx-10">
      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-4 max-w-md mx-auto p-4"
      >
        <input
          type="text"
          placeholder="Enter task name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <select
          value={assignedBy}
          onChange={(event) => setAssignedBy(event.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select assigned By</option>
          {users.map((user) => {
            return (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            );
          })}
        </select>
        <select
          value={assignedTo}
          onChange={(event) => setAssignedTo(event.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Assigned To</option>
          {users.map((user) => {
            return (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            );
          })}
        </select>
        {/* TODO: Add a tag option */}
        <span className="space-x-5 flex justify-end">
          <button type="button" className="w-50 bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-700 transition duration-200" onClick={handleCancel}>Cancel</button>
          <button
            type="submit"
            className="w-50 bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition duration-200"
          >
            Create Task
          </button>
        </span>  
      </form>
      </div>
    </div>
  );
};

export default InputTask;