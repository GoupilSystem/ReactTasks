import React from 'react';
import '../css/search.css';

function Search({ searchQuery, handleSearchChange }) {
  return (
    <input
      type="text"
      className="Search"
      value={searchQuery}
      onChange={(e) => handleSearchChange(e.target.value)}
      placeholder="Search tasks"
    />
  );
}

export default Search;