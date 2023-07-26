    // ItemForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/actions';

function TaskForWithRedux() {
  const [newTask, setNewTask] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim() === '') return;
    dispatch(addTask(newTask));
    setNewTask('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter a new task"
      />
      <button type="submit">Add Item</button>
    </form>
  );
}

export default TaskForWithRedux;
