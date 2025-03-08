import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { Item } from '../Item';
import '@testing-library/jest-dom';
import { addItem } from '../../../../../slices/starWarsItems';
import starWarsReducer from '../../../../../slices/starWarsItems';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../../../../../reduxHooks', () => ({
  useAppDispatch: jest.fn(),
}));

import { useAppDispatch as mockedUseAppDispatch } from '../../../../../reduxHooks';

describe('Item Component', () => {
  let store: EnhancedStore;
  let dispatch: jest.Mock;
  const mockPush = jest.fn();

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

    (useRouter as jest.Mock).mockReturnValue({
      query: { details: '11' },
      push: mockPush,
    });
  });

  it('renders the card with the correct item name', () => {
    render(
      <Provider store={store}>
        <Item item={mockedItemDetails} />
      </Provider>
    );
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });

  it('dispatches addItem when checkbox is checked and removeItem when unchecked', () => {
    render(
      <Provider store={store}>
        <Item item={mockedItemDetails} />
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(dispatch).toHaveBeenCalledWith(addItem(mockedItemDetails));
  });
});
