import React from 'react';
import { render, waitFor, screen, fireEvent,within } from '@testing-library/react';
import { ViewAllRecipes } from './ViewAllRecipes';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { request } from '../../utils/request';
import configureStore from 'redux-mock-store';
import { toast } from 'react-toastify';

// jest.mock('../../utils/request')
jest.mock('../../utils/request', () => ({
    request: jest.fn(),
  }));
  

jest.mock('react-simple-star-rating', () => ({
  Rating: ({ onClick, initialValue, readonly }) => (
    <div data-testid="rating" onClick={() => onClick && onClick(initialValue)}>
      {initialValue}
    </div>
  ),
}));

jest.mock('react-toastify', () => ({
    ...jest.requireActual('react-toastify'),
    toast: {
      success: jest.fn(),
      error: jest.fn(),
    },
  }));

// Create a mock store for Redux
const mockStore = configureStore([]);
const store = mockStore({
  auth: {
    id: 'user123',
    userName: 'testUser',
  },
});

const mockRecipes = [
    {
      _id: '1',
      title: 'Test Recipe',
      steps: 'Step one.\nStep two.\nStep three.',
      ingredients: ['Ingredient 1', 'Ingredient 2'],
      cookingTime: 30,
      ratingsAndComments: [
        { userName: 'John', rating: 4, comment: 'Great recipe!' },
        { userName: 'Jane', rating: 5, comment: 'Delicious!' },
      ],
      image: { data: { data: [1, 2, 3] }, contentType: 'image/jpeg' },
      averageRating: 4.5,
    },
    {
      _id: '2',
      title: 'Another Recipe',
      steps: 'Step one.\nStep two.',
      ingredients: ['Ingredient A', 'Ingredient B'],
      cookingTime: 45,
      ratingsAndComments: [{ userName: 'Jane', rating: 3, comment: 'Yummy!' },],
      image: { data: { data: [4, 5, 6] }, contentType: 'image/jpeg' },
      averageRating: 4.0,
    },
  ];
  

describe('ViewAllRecipes', () => {
 
  beforeEach(() => {
    request.mockResolvedValue(mockRecipes);
    global.URL.createObjectURL = jest.fn(() => 'blob:test-image-url');
  });

  it('should render recipes correctly', async () => {
    render(
      <Provider store={store}>
        <Router>
          <ViewAllRecipes />
          <ToastContainer />
        </Router>
      </Provider>
    );

    await waitFor(() => expect(request).toHaveBeenCalledTimes(1));
    expect(screen.getByText(/Test Recipe/i)).toBeInTheDocument();

    const imgElement = screen.getByAltText(/Test Recipe/i);
    expect(imgElement).toBeInTheDocument();
    expect(imgElement.src).toContain('blob:test-image-url');
    expect(screen.getByText(/Cooking Time: 30 minutes/)).toBeInTheDocument();
  });
  it('should show no recipes found when there are no recipes', async () => {
    request.mockResolvedValue([]); 

    const initialState = {
      auth: { token: null, userId: null, userName: null },
    };

    render(
      <Provider store={mockStore(initialState)}>
        <Router>
          <ViewAllRecipes />
        </Router>
      </Provider>
    );

    await waitFor(() => expect(screen.getByText(/No Recipes Found/i)).toBeInTheDocument());
  });

//   it('should add a comment to a recipe', async () => {
//     const initialState = {
//       auth: { token: null, userId: null, userName: null },
//     };
//     request.mockResolvedValue({
//         error: false,
//         message: 'Comment added successfully!',
//       });

//     render(
//       <Provider store={mockStore(initialState)}>
//         <Router>
//           <ViewAllRecipes />
//         </Router>
//       </Provider>
//     );

//     // Wait for recipes to be loaded
//     await waitFor(() => expect(request).toHaveBeenCalledTimes(3));
//     const firstRecipe = screen.getByText(/Test Recipe/i).closest('li'); 
//     const commentInput = within(firstRecipe).getByPlaceholderText('Add comment');
//     fireEvent.change(commentInput, { target: { value: 'This is a great recipe!' } });

//     const addCommentButton = within(firstRecipe).getByRole('button', { name: /add comment/i }); 
//     fireEvent.click(addCommentButton);

//     await waitFor(() => expect(toast.success).toHaveBeenCalledWith('Comment added successfully!'));
//   });
});
