import React from 'react';
import PropTypes from 'prop-types';

function TaskList({ tasks, handleTaskToggle, handleTaskDelete }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <span
            className={task.completed ? 'completed task-text' : 'task-text'}
            onClick={() => handleTaskToggle(task.id)}
          >
            {task.text}
          </span>
          <button className="delete-button" onClick={() => handleTaskDelete(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  handleTaskToggle: PropTypes.func.isRequired,
  handleTaskDelete: PropTypes.func.isRequired,
};

export default TaskList;
