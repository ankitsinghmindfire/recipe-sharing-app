import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import authReducer from '../../slices/authSlice';
import { logoutSuccess } from '../../slices/authSlice';
import { configureStore } from '@reduxjs/toolkit';

// Mock Redux store with initial state
const mockStore = (initialState) => {
  return configureStore({
    reducer: {
      auth: (state = initialState.auth, action) => authReducer(state, action),
    },
    preloadedState: initialState,
  });
};

// Helper function to render components with providers
const renderWithProviders = (ui, { initialState }) => {
  const store = mockStore(initialState);
  return render(
    <Provider store={store}>
      <Router>{ui}</Router>
    </Provider>
  );
};

describe('Navbar Component', () => {
  // Test for rendering navbar when user is logged in
  it('renders navbar with logged in user', () => {
    // Mock the state of logged in user (with token)
    const initialState = {
      auth: { token: 'fake_token' },
    };

    renderWithProviders(<Navbar />, { initialState });

    // Check if navigation items are present
    expect(screen.getByText(/Recipes/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Recipe/i)).toBeInTheDocument();
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });

  //   Test for rendering navbar when user is logged out
  it('renders navbar with logged out user', () => {
    // Mock the state of logged out user (no token)
    const initialState = {
      auth: { token: null },
    };

    renderWithProviders(<Navbar />, { initialState });

    // Check if login and signup links are present
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/SignUp/i)).toBeInTheDocument();
  });

  //   // Test hamburger menu toggle functionality
  //   test('should toggle hamburger menu visibility on click', () => {
  //     render(
  //       <Provider store={store}>
  //         <Router>
  //           <Navbar />
  //         </Router>
  //       </Provider>
  //     );

  //     // Initially, the menu should not be visible
  //     expect(screen.queryByText(/Recipes/i)).toBeNull();

  //     // Click on the hamburger icon to open the menu
  //     fireEvent.click(screen.getByRole('button', { name: /bars/i }));

  //     // Now, the menu should be visible
  //     expect(screen.getByText(/Recipes/i)).toBeInTheDocument();
  //   });

  //   // Test logout functionality
  //   test('logs out and redirects to login page', () => {
  //     // Mock the state of logged in user (with token)
  //     const initialState = {
  //       auth: { token: 'fake_token' }
  //     };

  //     // Mock the navigate function
  //     const mockNavigate = jest.fn();

  //     render(
  //       <Provider store={{ ...store, getState: () => initialState }}>
  //         <Router>
  //           <Navbar navigate={mockNavigate} />
  //         </Router>
  //       </Provider>
  //     );

  //     // Simulate the user clicking on the "Logout" link
  //     fireEvent.click(screen.getByText(/Logout/i));

  //     // Ensure localStorage.clear is called
  //     expect(localStorage.clear).toHaveBeenCalled();

  //     // Check if logout action was dispatched
  //     expect(store.dispatch).toHaveBeenCalledWith(logoutSuccess());

  //     // Ensure the user is navigated to the login page
  //     expect(mockNavigate).toHaveBeenCalledWith('/login');
  //   });

  //   // Test the correct closing of the menu on a link click
  //   test('closes the menu when a link is clicked', () => {
  //     render(
  //       <Provider store={store}>
  //         <Router>
  //           <Navbar />
  //         </Router>
  //       </Provider>
  //     );

  //     // Open the menu
  //     fireEvent.click(screen.getByRole('button', { name: /bars/i }));

  //     // Check that the menu opens
  //     expect(screen.getByText(/Recipes/i)).toBeInTheDocument();

  //     // Click on the Recipes link
  //     fireEvent.click(screen.getByText(/Recipes/i));

  //     // Check that the menu is closed
  //     expect(screen.queryByText(/Recipes/i)).not.toBeInTheDocument();
  //   });
});
