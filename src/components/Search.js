import React from 'react';
import PropTypes from 'prop-types';
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

Search.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
};

export default Search;
