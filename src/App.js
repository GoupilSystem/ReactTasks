import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import TaskForWithRedux from './components/TaskFormWithRedux';
import TaskListWithRedux from './components/TaskListWithRedux';
import store from './redux/store';
import { fetchTasks } from './redux/actions';

import TaskList from './components/TaskList';
import Search from './components/Search';
import Simple from './components/Simple';
import UserInfo from './components/UserInfo';
import Config from './Config';
import { PublicClientApplication } from '@azure/msal-browser';
import './app.css';

function App() {
  useEffect(() => {
    // Dispatch the fetchTasks action when the component mounts
    store.dispatch(fetchTasks());
  }, []);

  // useEffect(() => {
  //   // Fetch tasks from the API and update the Redux store
  //   dispatch(fetchTasks());
  // }, [dispatch]);
  
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState('');

  const [filters, setFilters] = useState({
    completed: false,
    priority: '',
    // Add additional filter options as needed
  });
  
  const [sortCriteria, setSortCriteria] = useState(''); // Set the initial sorting criteria
  const [searchQuery, setSearchQuery] = useState('');

  const handleTaskChange = (event) => {
    setNewTaskName(event.target.value);
  };

  const handleTaskSubmit = async (event) => {
    event.preventDefault();
    if (newTaskName.trim() === '') return;
    
    // Perform authorization check here (assuming you have user data available in the 'user' state)
    // if (user.category !== 'CanAdd') {
    //   console.log('You do not have permission to add tasks.');
    //   return;
    // }

    // Submit = POST via query (not body)
    const url = `https://reacttasks-functions.azurewebsites.net/api/TaskManagement?name=${encodeURIComponent(newTaskName)}`;

    try {
      const response = await fetch(url, { method: 'POST' });
  
      if (!response.ok) {
        throw new Error(`Failed to add task. Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Task added:', data);
  
      setTasks([...tasks, data]);
      console.log('Add a task: new count = ' + tasks.length);
      setNewTaskName('');
    } catch (error) {
      console.error('Error while adding a task:', error);
    }
  };

  const handleTaskDelete = async (taskId) => {
    // Delete the task via API
    const url = `https://reacttasks-functions.azurewebsites.net/api/TaskManagement?id=${encodeURIComponent(taskId)}`;
  
    try {
      const response = await fetch(url, { method: 'DELETE' });
  
      if (!response.ok) {
        throw new Error(`Failed to delete task. Status: ${response.status}`);
      }
  
      // If the task was successfully deleted, update the local state by filtering out the deleted task.
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('Error while deleting a task:', error);
    }
  }; 

  const handleTaskToggle = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleTaskComplete = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: true };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
  };
  
  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
  };
  
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };
  
  const filteredTasks = tasks?.length > 0 ? tasks
  .filter((task) => {
    // Apply filters
    if (filters.completed && !task.completed) {
      return false;
    }
    if (filters.priority && task.priority !== filters.priority) {
      return false;
    }
    // Add additional filter conditions as needed
    return true;
  })
  .filter((task) => {
    // Apply search query
    const taskText = task?.name?.toLowerCase();
    const query = searchQuery.toLowerCase();
    return taskText?.includes(query);
  })
  .sort((a, b) => {
    // Apply sorting
    if (sortCriteria === 'name') {
      return a?.name?.localeCompare(b?.name);
    }
    // Add additional sorting criteria as needed
    return 0;
  }) : [];

  useEffect(() => {
    // Fetch tasks from the API
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://reacttasks-functions.azurewebsites.net/api/TaskManagement');
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchTasks();
  }, []);

  const msalConfig = {
    auth: {
      clientId: Config.auth.clientId, // Access clientId correctly from Config
      redirectUri: Config.auth.redirectUri,
      authority: Config.auth.authority,
    },
    cache: {
      cacheLocation: Config.cache.cacheLocation,
      storeAuthStateInCookie: Config.cache.storeAuthStateInCookie,
    },
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false); // Define the user authentication state
  const [user, setUser] = useState({});
  const [isInteracting, setIsInteracting] = useState(false);

  const loginRequest = {
    scopes: ['openid', 'profile', 'email'], // Add additional scopes as needed
  };

  const myMSALObj = new PublicClientApplication(msalConfig);

  const login = async () => {
    try {
      // Prevent multiple interactions if one is already in progress
      if (isInteracting) return;

      setIsInteracting(true); // Set the isInteracting state to true

      const response = await myMSALObj.loginPopup(loginRequest);
      const userAccount = response.account;
      if (userAccount) {
        setIsAuthenticated(true);
        const userWithCategory = {
          ...userAccount,
          category: userAccount.category || '', // Ensure the category property exists or set it to an empty string
        };
        setUser(userWithCategory);
      }
      setIsInteracting(false); // Reset isInteracting state after the interaction is completed
    } catch (error) {
      console.error('Error during login:', error);
      setIsAuthenticated(false);
      setUser({});
      setIsInteracting(false); // Reset isInteracting state in case of error as well
    }
  };

  const logout = () => {
    myMSALObj.logoutRedirect();
    setIsAuthenticated(false);
    setUser({});
  };

  return (
    <Provider store={store}>
      <TaskForWithRedux />
      <TaskListWithRedux />

      <Router>
        <div className="App">

          <UserInfo
              isAuthenticated={isAuthenticated}
              user={user}
              login={login}
              logout={logout}
          />

          {isAuthenticated ? (
            <>
              <h1>Task Management Application</h1>

              <Search searchQuery={searchQuery} handleSearchChange={handleSearchChange} />

              <form onSubmit={handleTaskSubmit}>
                <input
                  type="text"
                  value={newTaskName}
                  onChange={(event) => setNewTaskName(event.target.value)}
                  placeholder="Enter a new task"
                />
                <button type="submit">Add Task</button>
              </form>

              {/* Sort Dropdown */}
              <select value={sortCriteria} onChange={(e) => handleSortChange(e.target.value)}>
                <option value="">Sort by</option>
                <option value="name">Name</option>
                {/* Add additional sort options as needed */}
              </select>

              <Routes>
                {/* Add your routes */}
                <Route path="/" element={<TaskList 
                  tasks={filteredTasks} 
                  handleTaskToggle={handleTaskToggle} 
                  handleTaskDelete={handleTaskDelete} 
                  handleTaskComplete={handleTaskComplete} />} 
                />
                <Route path="/simple" element={<Simple />} />
              </Routes>
            </>
          ) : null}

        </div>
      </Router>
    </Provider>
  );
}

export default App;
