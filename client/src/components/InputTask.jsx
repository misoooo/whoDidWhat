import React, { useState } from 'react';

const InputTask = () => {
  const [taskName, setTaskName] = useState('');
  const [assignee, setAssignee] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleAssigneeChange = (event) => {
    setAssignee(event.target.value);
  };

  const handleAssignedToChange = (event) => {
    setAssignedTo(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const taskData = {
      taskName: taskName,
      assignee: assignee,
      assignedTo: assignedTo,
    };

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        console.log('task created successfully');
        setTaskName('');
        setAssignee('');
        setAssignedTo('');
      } else {
        console.error('failed to create task');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4 max-w-md mx-auto p-4">
      <input
        type="text"
        placeholder="Enter task name"
        value={taskName}
        onChange={handleTaskNameChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <select value={assignee} onChange={handleAssigneeChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" required>
        <option value="">Select Assignee</option>
        <option value="user1">User 1</option>
        <option value="user2">User 2</option>
        <option value="user3">User 3</option>
      </select>
      <select value={assignedTo} onChange={handleAssignedToChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" required>
        <option value="">Select Assigned To</option>
        <option value="group1">Group 1</option>
        <option value="group2">Group 2</option>
        <option value="group3">Group 3</option>
      </select>
      <button type="submit"  className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition duration-200">Create Task</button>
    </form>
  );
};

export default InputTask;