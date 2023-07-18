import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './components/TaskList';
import Search from './components/Search';
import Simple from './components/Simple'; 
import './app.css';

function App() {
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

  const handleTaskSubmit = (event) => {
    event.preventDefault();
    if (newTaskName.trim() === '') return;

    const task = {
      name: newTaskName,
      id: tasks.length + 1,
      text: setNewTaskName,
      createdAt: new Date().getTime(),
      completed: false,
    };

    setTasks([...tasks, task]);
    console.log(`Add a task: new count = ${tasks.length}`);
    setNewTaskName('');
  };

  const handleTaskDelete = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
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
        const response = await fetch('https://reacttasks-functions.azurewebsites.net/api/TaskManagementFunction');
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

  return (
    <Router>
      <div className="App">
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

      </div>
    </Router>
  );
}

export default App;
