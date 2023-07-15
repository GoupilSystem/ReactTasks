import React, { useState } from 'react';
import PropTypes from 'prop-types';

function TaskCreate({ handleTaskSubmit }) {
  const [newTask, setNewTask] = useState('');

  const handleTaskChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newTask.trim() === '') return;

    handleTaskSubmit(newTask);
    setNewTask('');
  };

  return (
    <div>
      <h2>Create New Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTask}
          onChange={handleTaskChange}
          placeholder="Enter a new task"
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

TaskCreate.propTypes = {
    handleTaskSubmit: PropTypes.func.isRequired,
  };

export default TaskCreate;
