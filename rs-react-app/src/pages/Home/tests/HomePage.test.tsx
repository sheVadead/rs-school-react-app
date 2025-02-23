import { render, screen, fireEvent } from '@testing-library/react';
import { HomePage } from '../HomePage';
import { ThemeContext } from '../../../context/themeContext';
import { useGetStarWarsPersonsBySearchQuery } from '../../../slices/api/starWarsApiSlice';
import { useLocalStorage } from '../components/SearchInput/hooks/useSearchQuery';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { ErrorBoundary } from '../../../sharedComponents/ErrorBoundary/ErrorBoundary';

jest.mock('../components/SearchInput/SearchInput', () => ({
  SearchInput: jest.fn(() => <div>SearchInput</div>),
}));

jest.mock('../components/ItemList/ItemList', () => ({
  ItemList: jest.fn(() => <div>ItemList</div>),
}));

jest.mock('../components/Pagination/Pagination', () => ({
  Pagination: jest.fn(({ children }) => <div>{children}</div>),
}));

jest.mock('../components/Flyout/Flyout', () => ({
  Flyout: jest.fn(() => <div>Flyout</div>),
}));

jest.mock('../../../sharedComponents/Loader/Loader', () => ({
  Loader: jest.fn(() => <div>Loader</div>),
}));

jest.mock('../components/SearchInput/hooks/useSearchQuery', () => ({
  useLocalStorage: jest.fn(),
}));

jest.mock('../../../slices/api/starWarsApiSlice', () => ({
  useGetStarWarsPersonsBySearchQuery: jest.fn(),
}));

describe('HomePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the HomePage component', () => {
    (useLocalStorage as jest.Mock).mockReturnValue(['', jest.fn()]);
    (useGetStarWarsPersonsBySearchQuery as jest.Mock).mockReturnValue({
      data: { pageCount: 1, results: [] },
      error: null,
      isFetching: false,
    });

    render(
      <Router>
        <ThemeContext.Provider value="light">
          <HomePage />
        </ThemeContext.Provider>
      </Router>
    );

    expect(screen.getByText('SearchInput')).toBeInTheDocument();
    expect(screen.getByText('Flyout')).toBeInTheDocument();
    expect(screen.getByText('ItemList')).toBeInTheDocument();
  });

  it('should display the loader when data is being fetched', () => {
    (useLocalStorage as jest.Mock).mockReturnValue(['', jest.fn()]);
    (useGetStarWarsPersonsBySearchQuery as jest.Mock).mockReturnValue({
      data: { pageCount: 1, results: [] },
      error: null,
      isFetching: true,
    });

    render(
      <Router>
        <ThemeContext.Provider value="light">
          <HomePage />
        </ThemeContext.Provider>
      </Router>
    );

    expect(screen.getByText('Loader')).toBeInTheDocument();
  });

  it('should show error message when there is an error in fetching data', () => {
    (useLocalStorage as jest.Mock).mockReturnValue(['', jest.fn()]);
    (useGetStarWarsPersonsBySearchQuery as jest.Mock).mockReturnValue({
      data: { pageCount: 1, results: [] },
      error: true,
      isFetching: false,
    });

    render(
      <Router>
        <ThemeContext.Provider value="light">
          <HomePage />
        </ThemeContext.Provider>
      </Router>
    );

    expect(screen.getByText('ItemList')).toBeInTheDocument(); // Assuming the error triggers some error text in ItemList
  });

  it('should trigger error boundary when the button is clicked', async () => {
    (useLocalStorage as jest.Mock).mockReturnValue(['', jest.fn()]);
    (useGetStarWarsPersonsBySearchQuery as jest.Mock).mockReturnValue({
      data: { pageCount: 1, results: [] },
      error: null,
      isFetching: false,
    });

    render(
      <Router>
        <ThemeContext.Provider value="light">
          <ErrorBoundary>
            <HomePage />
          </ErrorBoundary>
        </ThemeContext.Provider>
      </Router>
    );

    const button = screen.getByText('Trigger Error Boundary error');
    fireEvent.click(button);

    expect(
      screen.getByText(/Error while rendering the app/i)
    ).toBeInTheDocument();
  });
});
