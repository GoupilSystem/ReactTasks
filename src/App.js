import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskCreate from './components/TaskCreate';
import Search from './components/Search';
import Simple from './components/Simple'; 
import Simple2 from './components/Simple2'; 
import './app.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const [filters, setFilters] = useState({
    completed: false,
    priority: '',
    // Add additional filter options as needed
  });
  
  const [sortCriteria, setSortCriteria] = useState(''); // Set the initial sorting criteria
  const [searchQuery, setSearchQuery] = useState('');

  const handleTaskChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleTaskSubmit = (event) => {
    event.preventDefault();
    if (newTask.trim() === '') return;

    const task = {
      id: new Date().getTime(),
      text: newTask,
      completed: false,
    };

    setTasks([...tasks, task]);
    setNewTask('');
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
  
  const filteredTasks = tasks
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
    const taskText = task.text.toLowerCase();
    const query = searchQuery.toLowerCase();
    return taskText.includes(query);
  })
  .sort((a, b) => {
    // Apply sorting
    if (sortCriteria === 'name') {
      return a.text.localeCompare(b.text);
    }
    // Add additional sorting criteria as needed
    return 0;
  });

  return (
    <Router>
      <div className="App">
        <h1>Task Management Application</h1>

        <Search searchQuery={searchQuery} handleSearchChange={handleSearchChange} />

        <form onSubmit={handleTaskSubmit}>
          <input
            type="text"
            value={newTask}
            onChange={handleTaskChange}
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

        <TaskList
          tasks={filteredTasks}
          handleTaskToggle={handleTaskToggle}
          handleTaskDelete={handleTaskDelete}
          handleTaskComplete={handleTaskComplete}
        />
        
        <Routes>
          {/* Add your routes */}
          <Route path="/" element={<Simple />} />
          <Route path="/create" element={<Simple2 />} />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
