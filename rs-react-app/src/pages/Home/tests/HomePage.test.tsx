import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from '../HomePage';
import '@testing-library/jest-dom';

jest.mock('../components/SearchInput/SearchInput', () => ({
  SearchInput: () => <div data-testid="search-input">SearchInput</div>,
}));

jest.mock('../components/ItemList/ItemList', () => ({
  ItemList: () => <div data-testid="item-list">ItemList</div>,
}));

jest.mock('../components/Pagination/Pagination', () => ({
  Pagination: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="pagination">{children}</div>
  ),
}));

jest.mock('../../../sharedComponents/Loader/Loader', () => ({
  Loader: () => <div data-testid="loader">Loader</div>,
}));

import * as useFetchItemsModule from '../components/SearchInput/hooks/useFetchItems';
import * as useLocalStorageModule from '../components/SearchInput/hooks/useSearchQuery';
import { mockedItemList } from '../../../../__mocks__';

const mockSetFetchedItemsToState = jest.fn();
const mockUseFetchItemsReturn = {
  items: mockedItemList,
  isLoading: false,
  isError: false,
  count: 1,
  setFetchedItemsToState: mockSetFetchedItemsToState,
};

const mockSetLastSearchTerm = jest.fn();
const mockUseLocalStorageReturn: [string, (value: string) => void] = [
  'initial search',
  mockSetLastSearchTerm,
];

jest
  .spyOn(useFetchItemsModule, 'useFetchItems')
  .mockReturnValue(mockUseFetchItemsReturn);
jest
  .spyOn(useLocalStorageModule, 'useLocalStorage')
  .mockReturnValue(mockUseLocalStorageReturn);

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('HomePage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls setFetchedItemsToState on mount', () => {
    render(
      <MemoryRouter initialEntries={['/page/1']}>
        <Routes>
          <Route path="/page/:pageNumber" element={<HomePage />} />
        </Routes>
      </MemoryRouter>
    );
    expect(mockSetFetchedItemsToState).toHaveBeenCalled();
  });

  it('renders SearchInput, Pagination and ItemList when not loading', () => {
    render(
      <MemoryRouter initialEntries={['/page/1']}>
        <Routes>
          <Route path="/page/:pageNumber" element={<HomePage />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
    expect(screen.getByTestId('item-list')).toBeInTheDocument();
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
  });

  it('renders Loader instead of ItemList when isLoading is true', () => {
    jest.spyOn(useFetchItemsModule, 'useFetchItems').mockReturnValue({
      ...mockUseFetchItemsReturn,
      isLoading: true,
    });
    render(
      <MemoryRouter initialEntries={['/page/1']}>
        <Routes>
          <Route path="/page/:pageNumber" element={<HomePage />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.queryByTestId('item-list')).not.toBeInTheDocument();
  });

  it('renders background div when itemName is present and clicking it navigates back', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/page/1/details/luke']}>
        <Routes>
          <Route
            path="/page/:pageNumber/details/:itemName"
            element={<HomePage />}
          />
        </Routes>
      </MemoryRouter>
    );

    const bgDiv = container.querySelector('div[class*="background"]');
    expect(bgDiv).toBeInTheDocument();

    if (bgDiv) {
      fireEvent.click(bgDiv);
    }
    expect(mockNavigate).toHaveBeenCalledWith('/page/1', { replace: true });
  });

  it('triggers error when clicking "Trigger Error Boundary error" button', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <MemoryRouter initialEntries={['/page/1']}>
        <Routes>
          <Route path="/page/:pageNumber" element={<HomePage />} />
        </Routes>
      </MemoryRouter>
    );
    const errorButton = screen.getByText(/Trigger Error Boundary error/i);
    expect(() => {
      fireEvent.click(errorButton);
    }).toThrow('Test error for ErrorBoundary');
    (console.error as jest.Mock).mockRestore();
  });
});
