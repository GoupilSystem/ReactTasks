import React from 'react';
import PropTypes from 'prop-types';

function TaskList({ tasks, handleTaskToggle, handleTaskDelete, handleTaskComplete }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <span
            className={task.completed ? 'completed task-text' : 'task-text'}
            onClick={() => handleTaskToggle(task.id)}
          >
            {task.name} (id:{task.id})
          </span>
          <button className="delete-button" onClick={() => handleTaskDelete(task.id)}>
            Delete
          </button>
          {!task.completed && (
            <button className="complete-button" onClick={() => handleTaskComplete(task.id)}>
              Complete
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  handleTaskToggle: PropTypes.func.isRequired,
  handleTaskDelete: PropTypes.func.isRequired,
  handleTaskComplete: PropTypes.func.isRequired
};

export default TaskList;