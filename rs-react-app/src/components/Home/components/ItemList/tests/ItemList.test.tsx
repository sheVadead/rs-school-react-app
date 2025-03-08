import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ItemList } from '../ItemList';
import '@testing-library/jest-dom';
import {
  mockedItemList,
  mockedItemListResponse,
} from '../../../../../../__mocks__';
import { EnhancedStore, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import starWarsReducer from '../../../../../slices/starWarsItems';

const mockNavigate = jest.fn();

import { useAppDispatch as mockedUseAppDispatch } from '../../../../../reduxHooks';

jest.mock('../../../../../reduxHooks', () => ({
  useAppDispatch: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('ItemList Component', () => {
  let store: EnhancedStore;
  let dispatch: jest.Mock;

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
  it('renders correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/page/1']}>
          <Routes>
            <Route
              path="/page/:pageNumber"
              element={<ItemList items={mockedItemList} isError={false} />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Leya Skywalker/i)).toBeInTheDocument();
    expect(screen.getByText(/Darth Vader/i)).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/page/1']}>
          <Routes>
            <Route
              path="/page/:pageNumber"
              element={<ItemList items={mockedItemList} isError={true} />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(
      screen.getByText(/Something went wrong. Try again later/i)
    ).toBeInTheDocument();
  });

  it('renders the specified number of cards', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/page/1']}>
          <Routes>
            <Route
              path="/page/:pageNumber"
              element={<ItemList items={mockedItemList} isError={false} />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const cards = screen.getAllByRole('heading');
    expect(cards).toHaveLength(mockedItemListResponse.items.length);
  });

  it('displays appropriate message if no cards are present', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/page/1']}>
          <Routes>
            <Route
              path="/page/:pageNumber"
              element={<ItemList items={[]} isError={false} />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/No items found/i)).toBeInTheDocument();
  });
});
