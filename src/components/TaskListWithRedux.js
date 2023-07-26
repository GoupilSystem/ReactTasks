import React from 'react';
import { useSelector } from 'react-redux';

function TaskListWithRedux() {
  const tasks = useSelector((state) => state.tasks); // Change to state.tasks

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>{task.name}</li>
      ))}
    </ul>
  );
}

export default TaskListWithRedux;
