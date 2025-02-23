const mockNavigate = jest.fn();
const mockUseGetStarWarsPersonByIdQuery = jest.fn();
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Details } from '../Details';
import '@testing-library/jest-dom';

jest.mock('../../../../../slices/api/starWarsApiSlice', () => {
  return {
    useGetStarWarsPersonByIdQuery:
      mockUseGetStarWarsPersonByIdQuery.mockReturnValue({
        data: {
          name: 'Luke Skywalker',
          height: '172',
          mass: '77',
          hair_color: 'blond',
          eye_color: 'blue',
          birth_year: '19BBY',
          gender: 'male',
        },
      }),
    useGetStarWarsPersonsBySearchQuery: jest.fn(),
  };
});
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Details Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
    mockUseGetStarWarsPersonByIdQuery.mockReturnValueOnce({ isFetching: true });
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
    mockUseGetStarWarsPersonByIdQuery.mockReturnValueOnce({ error: true });

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
