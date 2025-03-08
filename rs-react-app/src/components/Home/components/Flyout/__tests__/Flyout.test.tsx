import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { Flyout } from '../Flyout';
import { clearItems, StarWarsState } from '../../../../../slices/starWarsItems';
import starWarsReducer from '../../../../../slices/starWarsItems';
import '@testing-library/jest-dom';

jest.mock('../../../../../reduxHooks', () => ({
  useAppDispatch: jest.fn(),
}));

import { useAppDispatch as mockedUseAppDispatch } from '../../../../../reduxHooks';

jest.mock('../hooks/useJsonToCsv', () => ({
  useJsonToCsv: () => ({ url: 'test-url.csv' }),
}));

describe('Flyout Component', () => {
  let store: EnhancedStore;
  let dispatch: jest.Mock;
  const mockSelectedItem = {
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
        } as StarWarsState,
      },
    });
    dispatch = jest.fn();
    (mockedUseAppDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
  });

  test('does not render when there are no selected items', () => {
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(screen.queryByText(/Selected:/)).not.toBeInTheDocument();
  });

  test('renders correctly when there are selected items', () => {
    store = configureStore({
      reducer: {
        starWars: starWarsReducer,
      },
      preloadedState: {
        starWars: {
          selectedItems: [mockSelectedItem],
        } as StarWarsState,
      },
    });
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(screen.getByText('Selected: 1 item')).toBeInTheDocument();
    expect(screen.getByText('Unselect all')).toBeInTheDocument();
    expect(screen.getByText('Download')).toBeInTheDocument();
  });

  test('dispatches clearItems action when "Unselect all" is clicked', () => {
    store = configureStore({
      reducer: {
        starWars: starWarsReducer,
      },
      preloadedState: {
        starWars: {
          selectedItems: [mockSelectedItem],
        } as StarWarsState,
      },
    });
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    fireEvent.click(screen.getByText('Unselect all'));
    expect(dispatch).toHaveBeenCalledWith(clearItems());
  });

  test('renders download link with correct href and filename', () => {
    store = configureStore({
      reducer: {
        starWars: starWarsReducer,
      },
      preloadedState: {
        starWars: {
          selectedItems: [mockSelectedItem],
        } as StarWarsState,
      },
    });
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    const downloadLink = screen.getByText('Download');
    expect(downloadLink).toHaveAttribute('href', 'test-url.csv');
    expect(downloadLink).toHaveAttribute('download', '1_person.csv');
  });

  it('renders correct text for multiple selected items', () => {
    store = configureStore({
      reducer: {
        starWars: starWarsReducer,
      },
      preloadedState: {
        starWars: {
          selectedItems: [mockSelectedItem, { ...mockSelectedItem, id: 2 }],
        } as StarWarsState,
      },
    });
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(screen.getByText('Selected: 2 items')).toBeInTheDocument();
  });

  it('renders correct download filename for multiple selected items', () => {
    store = configureStore({
      reducer: {
        starWars: starWarsReducer,
      },
      preloadedState: {
        starWars: {
          selectedItems: [mockSelectedItem, { ...mockSelectedItem, id: 2 }],
        } as StarWarsState,
      },
    });
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    const downloadLink = screen.getByText('Download');
    expect(downloadLink).toHaveAttribute('download', '2_persons.csv');
  });
});
