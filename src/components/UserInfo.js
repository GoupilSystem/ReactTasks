import React from 'react';
import PropTypes from 'prop-types';

const UserInfo = ({ isAuthenticated, user, login, logout }) => {
  if (isAuthenticated && user) {
    return (
      <div>
        <p>Welcome, {user.name}</p>
        <p>Email: {user.email}</p>
        <button onClick={logout}>Logout</button>
      </div>
    );
  } else {
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
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

export default UserInfo;
