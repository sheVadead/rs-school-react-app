import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { Item } from '../Item';
import '@testing-library/jest-dom';
import { addItem } from '../../../../../slices/starWarsItems';
import starWarsReducer from '../../../../../slices/starWarsItems';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ pageNumber: '1' }),
  };
});

jest.mock('../../../../../reduxHooks', () => ({
  useAppDispatch: jest.fn(),
}));

import { useAppDispatch as mockedUseAppDispatch } from '../../../../../reduxHooks';

describe('Item Component', () => {
  let store: EnhancedStore;
  let dispatch: jest.Mock;

  const mockedItemDetails = {
    id: 1,
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
    homeworld: 'test',
    films: ['asdasf'],
    url: 'string',
  };

  beforeEach(() => {
    store = configureStore({
      reducer: {
        starWars: starWarsReducer,
      },
      preloadedState: {
        starWars: {
          selectedItems: [],
        },
      },
    });
    dispatch = jest.fn();
    (mockedUseAppDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
  });

  it('renders the card with the correct item name', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Item item={mockedItemDetails} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });

  it('navigates to the details page when the card is clicked', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Item item={mockedItemDetails} />
        </MemoryRouter>
      </Provider>
    );

    const id = mockedItemDetails.url.split('/').slice(-2)[0];
    const cardElement = screen.getByTestId(id);
    fireEvent.click(cardElement);
    expect(mockNavigate).toHaveBeenCalledWith(`/page/1/details/${id}`);
  });

  it('dispatches addItem when checkbox is checked and removeItem when unchecked', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Item item={mockedItemDetails} />
        </MemoryRouter>
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(dispatch).toHaveBeenCalledWith(addItem(mockedItemDetails));
  });
});
