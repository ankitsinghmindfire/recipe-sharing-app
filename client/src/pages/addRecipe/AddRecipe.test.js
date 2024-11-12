import React,{ act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter as Router } from 'react-router-dom';
import {AddRecipe} from './AddRecipe.jsx';
import authReducer from '../../slices/authSlice';
import { ToastContainer } from 'react-toastify';
import 'jest-canvas-mock';

// Mock Redux store with initial state
const mockStore = (initialState) => {
  return configureStore({
    reducer: {
      auth: (state = initialState.auth, action) => authReducer(state, action),
    },
    preloadedState: initialState,
  });
};

const renderWithProviders = (ui, { initialState }) => {
  const store = mockStore(initialState);
  return render(
    <Provider store={store}>
      <Router>{ui}</Router>
    </Provider>
  );
};

describe('AddRecipe Component', () => {
  const initialState = { auth: { id: 'user123' } };

  renderWithProviders(
    <>
      <AddRecipe />
      <ToastContainer />
    </>,
    { initialState }
  );

  it('renders form fields correctly', () => {
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Ingredients/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Steps/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Upload Image/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Cooking Time \(minutes\)/i)
    ).toBeInTheDocument();
  });

    it('handles form submission with valid data', async () => {
        const initialState = { auth: { id: 'user123' } };

        renderWithProviders(
            <>
              <AddRecipe />
              <ToastContainer />
            </>,
            { initialState }
          );
          await act(async () => {
            fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Test Recipe' } });
            fireEvent.change(screen.getAllByLabelText(/Ingredients/i)[0], { target: { value: 'Salt' } });
            fireEvent.change(screen.getByLabelText(/Steps/i), { target: { value: 'Step 1: Mix ingredients' } });
            fireEvent.change(screen.getByLabelText(/Cooking Time \(minutes\)/i), { target: { value: 15 } });
      
            const fileInput = screen.getByLabelText(/Upload Image/i);
            const testFile = new File(['dummy content'], 'test.png', { type: 'image/png' });
            fireEvent.change(fileInput, { target: { files: [testFile] } });
      
            const submitButton = screen.getByRole('button', { name: /Create Recipe/i });
            fireEvent.click(submitButton);
          })
     
    });

  //   it('displays error if required fields are missing', async () => {
  //     const submitButton = screen.getByRole('button', { name: /Create Recipe/i });
  //     fireEvent.click(submitButton);

  //     await waitFor(() => {
  //       expect(screen.getByText(/All fields are required/i)).toBeInTheDocument();
  //     });
  //   });

  //   it('displays error if cooking time is invalid', async () => {
  //     fireEvent.change(screen.getByLabelText(/Cooking Time \(minutes\)/i), { target: { value: 0 } });
  //     fireEvent.blur(screen.getByLabelText(/Cooking Time \(minutes\)/i));

  //     await waitFor(() => {
  //       expect(screen.getByText(/Cooking time must be at least 1 minute/i)).toBeInTheDocument();
  //     });
  //   });
});
