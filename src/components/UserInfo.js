import React from 'react';
import PropTypes from 'prop-types';

const UserInfo = ({ isAuthenticated, user, login, logout }) => {
  console.log(user);
  if (isAuthenticated && user && user.name && user.username) {
    // If isAuthenticated is true and user.name is available
    // Render the user info
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p style={{ marginRight: '10px' }}>Welcome, {user.name}</p>
        <p style={{ marginRight: '10px' }}>Email: {user.username}</p>
        <button onClick={logout}>Logout</button>
      </div>
    );
  } else {
    // If not authenticated or user.name is missing
    // Render the login button
    return (
      <p>
        <button onClick={login}>Login</button>
      </p>
    );
  }
};

UserInfo.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    username: PropTypes.string,
  }),
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

export default UserInfo;
