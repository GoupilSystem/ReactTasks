// actions.js
let taskIdCounter = 10;

export const ActionType = {
  ADD_TASK: 'ADD_TASK',
  FETCH_TASKS: 'FETCH_TASKS',
};

export const addTask = (taskName) => ({
  type: ActionType.ADD_TASK,
  payload: {
    id: taskIdCounter++, // Generate a unique ID
    name: taskName,
  },
});

export const fetchTasks = () => {
  return async (dispatch) => {
    try {
      const url = 'https://reacttasks-functions.azurewebsites.net/api/TaskManagement';
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch tasks. Status: ${response.status}`);
      }

      const data = await response.json();

      // Dispatch the action to update the state with the fetched tasks
      dispatch({
        type: ActionType.FETCH_TASKS,
        payload: data,
      });
    } catch (error) {
      console.error('Error while fetching tasks:', error);
    }
  };
};
