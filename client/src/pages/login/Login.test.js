import React, { act } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { loginSuccess } from '../../slices/authSlice';
import { ToastContainer } from 'react-toastify';
import { Login } from './Login';
import { request } from '../../utils/request';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// jest.mock('../../utils/request');
jest.mock('../../utils/request', () => ({
  request: jest.fn().mockResolvedValue({
    error: false,
  }),
}));

jest.mock('react-toastify', () => ({
  ...jest.requireActual('react-toastify'),
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('../../slices/authSlice', () => ({
  ...jest.requireActual('../../slices/authSlice'),
  loginSuccess: jest.fn(),
}));

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock Redux store with initial state
const mockStore = (initialState) => {
  return configureStore({
    reducer: {
      auth: (state = initialState.auth, action) => {
        if (action.type === loginSuccess.type) {
          return {
            ...state,
            token: action.payload.token,
            userId: action.payload.userId,
            userName: action.payload.userName,
          };
        }
        return state;
      },
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

describe('Login Component', () => {
  const initialState = { auth: { token: null, userId: null, userName: null } };
  const mockNavigate = useNavigate();

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();

    // Mock setItem method on localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        setItem: jest.fn(),
        getItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });

    renderWithProviders(
      <>
        <ToastContainer />
        <Login />
      </>,
      {
        initialState,
      }
    );
  });

  // it('should render form fields correctly', () => {
  //   expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
  //   expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  //   expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  // });

  // it('displays validation error if fields are empty', async () => {
  //   await act(async () => {
  //     fireEvent.change(screen.getByLabelText(/Username/i), {
  //       target: { value: '' },
  //     });
  //     fireEvent.change(screen.getByLabelText(/Password/i), {
  //       target: { value: '' },
  //     });
  //     fireEvent.click(screen.getByRole('button', { name: /Login/i }));
  //   });

  //   await waitFor(() => {
  //     expect(screen.getByText(/Username is required/i)).toBeInTheDocument();
  //     expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
  //   });
  // });

  it('handles successful login', async () => {
    const mockResponse = {
      token: 'fake-token',
      userId: '123',
      userName: 'testuser',
    };

    request.mockResolvedValue(mockResponse);

    // fireEvent.change(screen.getByLabelText(/Username/i), {
    //   target: { value: 'test@example.com' },
    // });
    // fireEvent.change(screen.getByLabelText(/Password/i), {
    //   target: { value: 'Password123' },
    // });
    // await act(async () => {
    //   fireEvent.click(screen.getByRole('button', { name: /Login/i }));
    // });

    // await waitFor(() => {
      // Expect localStorage to have the correct values
      // expect(localStorage.setItem).toHaveBeenCalledWith(
      //   'token',
      //   mockResponse.token
      // );
      // expect(localStorage.setItem).toHaveBeenCalledWith(
      //   'userId',
      //   mockResponse.userId
      // );
      // expect(localStorage.setItem).toHaveBeenCalledWith(
      //   'userName',
      //   mockResponse.userName
      // );

      // expect(mockNavigate).toHaveBeenCalledWith('/');
      // expect(toast.error).not.toHaveBeenCalled();
    // });

    renderWithProviders(
      <>
        <ToastContainer />
        <Login />
      </>,
      {
        initialState,
      }
    );
  });
});
