import { ActionType } from './actions';

const initialState = {
  // tasks: [
  //   { id: 1, name: 'Task 1', completed: false },
  //   { id: 2, name: 'Task 2', completed: true },
  //   { id: 3, name: 'Task 3', completed: false }
  // ],
  tasks: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.ADD_TASK: // Change to ActionType.ADD_TASK
      return {
        ...state,
        tasks: [...state.tasks, action.payload], // Change to tasks instead of items
      };
    case ActionType.FETCH_TASKS:
      return {
        ...state,
        tasks: action.payload, // Update the tasks array with the fetched data
      };
    default:
      return state;
  }
};

export default reducer;
