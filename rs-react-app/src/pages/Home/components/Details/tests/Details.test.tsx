const mockNavigate = jest.fn();

import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Details } from '../Details';
import { useFetchStarWarsPerson } from '../../SearchInput/hooks/useFetchStarWarsPerson';
import '@testing-library/jest-dom';
import { mockedItemDetails } from '../../../../../../__mocks__';

jest.mock('../../SearchInput/hooks/useFetchStarWarsPerson');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const mockUseFetchStarWarsPerson =
  useFetchStarWarsPerson as jest.MockedFunction<typeof useFetchStarWarsPerson>;

describe('Details Component', () => {
  beforeEach(() => {
    mockUseFetchStarWarsPerson.mockReturnValue({
      item: mockedItemDetails,
      isLoading: false,
      isError: false,
      setFetchedPersonToState: jest.fn(),
    });
  });

  it('renders correctly', () => {
    render(
      <MemoryRouter initialEntries={['/page/1/details/Luke']}>
        <Routes>
          <Route
            path="/page/:pageNumber/details/:itemName"
            element={<Details />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Close/i)).toBeInTheDocument();
  });

  it('displays loading state', () => {
    mockUseFetchStarWarsPerson.mockReturnValueOnce({
      item: mockedItemDetails,
      isLoading: true,
      isError: false,
      setFetchedPersonToState: jest.fn(),
    });

    render(
      <MemoryRouter initialEntries={['/page/1/details/Luke']}>
        <Routes>
          <Route
            path="/page/:pageNumber/details/:itemName"
            element={<Details />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('displays error message', () => {
    mockUseFetchStarWarsPerson.mockReturnValueOnce({
      item: mockedItemDetails,
      isLoading: false,
      isError: true,
      setFetchedPersonToState: jest.fn(),
    });

    render(
      <MemoryRouter initialEntries={['/page/1/details/Luke']}>
        <Routes>
          <Route
            path="/page/:pageNumber/details/:itemName"
            element={<Details />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText(/Something went wrong. Try again later/i)
    ).toBeInTheDocument();
  });

  it('displays character details', () => {
    mockUseFetchStarWarsPerson.mockReturnValueOnce({
      item: mockedItemDetails,
      isLoading: false,
      isError: false,
      setFetchedPersonToState: jest.fn(),
    });

    render(
      <MemoryRouter initialEntries={['/page/1/details/Luke']}>
        <Routes>
          <Route
            path="/page/:pageNumber/details/:itemName"
            element={<Details />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
    expect(screen.getByText(/Height: 172/i)).toBeInTheDocument();
    expect(screen.getByText(/Mass: 77/i)).toBeInTheDocument();
    expect(screen.getByText(/Hair Color: blond/i)).toBeInTheDocument();
    expect(screen.getByText(/Eye Color: blue/i)).toBeInTheDocument();
    expect(screen.getByText(/Birth Year: 19BBY/i)).toBeInTheDocument();
    expect(screen.getByText(/Gender: male/i)).toBeInTheDocument();
  });

  it('navigates back on close button click', () => {
    render(
      <MemoryRouter initialEntries={['/page/1/details/1']}>
        <Routes>
          <Route
            path="/page/:pageNumber/details/:itemName"
            element={<Details />}
          />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Close/i));
    expect(mockNavigate).toHaveBeenCalledWith('/page/1', { replace: true });
  });
});
