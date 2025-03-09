import React from 'react';
import { render, screen } from '@testing-library/react';
import { ItemList } from '../ItemList';
import '@testing-library/jest-dom';
import {
  mockedItemList,
  mockedItemListResponse,
} from '../../../../../../__mocks__';
import { EnhancedStore, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import starWarsReducer from '../../../../../slices/starWarsItems';
import { useRouter, useParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));

import { useAppDispatch as mockedUseAppDispatch } from '../../../../../reduxHooks';

jest.mock('../../../../../reduxHooks', () => ({
  useAppDispatch: jest.fn(),
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

    (useRouter as jest.Mock).mockReturnValue({
      route: '/page/1',
    });

    (useParams as jest.Mock).mockReturnValue({
      pageNumber: '1',
    });
  });
  it('renders correctly', () => {
    render(
      <Provider store={store}>
        <ItemList items={mockedItemList} isError={false} />
      </Provider>
    );

    expect(screen.getByText(/Leya Skywalker/i)).toBeInTheDocument();
    expect(screen.getByText(/Darth Vader/i)).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(
      <Provider store={store}>
        <ItemList items={mockedItemList} isError={true} />
      </Provider>
    );

    expect(
      screen.getByText(/Something went wrong. Try again later/i)
    ).toBeInTheDocument();
  });

  it('renders the specified number of cards', () => {
    render(
      <Provider store={store}>
        <ItemList items={mockedItemList} isError={false} />
      </Provider>
    );

    const cards = screen.getAllByRole('heading');
    expect(cards).toHaveLength(mockedItemListResponse.items.length);
  });

  it('displays appropriate message if no cards are present', () => {
    render(
      <Provider store={store}>
        <ItemList items={[]} isError={false} />
      </Provider>
    );

    expect(screen.getByText(/No items found/i)).toBeInTheDocument();
  });
});
