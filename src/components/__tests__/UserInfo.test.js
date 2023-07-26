import React from 'react';
import { render, screen } from '@testing-library/react';
import UserInfo from '../UserInfo';

// test('renders login button when not authenticated', () => {
//   // Create mock login and logout functions
//   const login = jest.fn();
//   const logout = jest.fn();

//   // Render the component in the non-authenticated state
//   render(<UserInfo isAuthenticated={false} user={{}} login={login} logout={logout} />);

//   // Assert that the login button is displayed
//   expect(screen.getByText('Login')).toBeInTheDocument();
// });

// test('renders user info when authenticated', () => {
//     // Create mock login and logout functions
//     const login = jest.fn();
//     const logout = jest.fn();
  
//     // Mock user data
//     const user = {
//       name: 'John Doe',
//       username: 'john.doe@example.com'
//     };
  
//     // Render the component in the authenticated state
//     render(<UserInfo isAuthenticated={true} user={user} login={login} logout={logout} />);
  
//     // Assert that the user name is displayed
//     expect(screen.getByText(/Welcome, John Doe/i)).toBeInTheDocument();
//   });

  // Snapshot test
test('renders UserInfo component correctly', () => {
    // Create mock user data
    const user = {
      name: 'John Doe',
      username: 'john.doe@example.com',
    };
  
    // Render the component
    const { asFragment } = render(<UserInfo isAuthenticated={true} user={user} login={() => {}} logout={() => {}} />);
    
    // Assert that the component's UI matches the stored snapshot
    expect(asFragment()).toMatchSnapshot();
  });