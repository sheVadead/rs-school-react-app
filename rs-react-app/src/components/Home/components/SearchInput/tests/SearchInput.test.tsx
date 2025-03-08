import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SearchInput } from '../SearchInput';
import '@testing-library/jest-dom';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('SearchInput Component', () => {
  const setLastSearchTerm = jest.fn();
  const setFetchedItemsToState = jest.fn();
  const initialSearchTerm = 'initial value';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('retrieves value from local storage upon mounting (via props)', () => {
    render(
      <MemoryRouter>
        <SearchInput
          setLastSearchTerm={setLastSearchTerm}
          lastSearchTerm={initialSearchTerm}
          routerPageNumber={1}
        />
      </MemoryRouter>
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue(initialSearchTerm);
  });

  it('submits the form and calls setFetchedItemsToState if routerPageNumber is 1', () => {
    render(
      <MemoryRouter>
        <SearchInput
          setLastSearchTerm={setLastSearchTerm}
          lastSearchTerm={initialSearchTerm}
          routerPageNumber={1}
        />
      </MemoryRouter>
    );

    const searchButton = screen.getByRole('button', { name: /search/i });
    const form = searchButton.closest('form');
    if (!form) {
      throw new Error('Form not found');
    }
    fireEvent.submit(form);

    expect(mockNavigate).not.toHaveBeenCalled();
    expect(setLastSearchTerm).toHaveBeenCalledWith('initial value');
  });

  it('submits the form and navigates to "/page/1" if routerPageNumber is not 1', () => {
    render(
      <MemoryRouter initialEntries={['/page/2']}>
        <SearchInput
          setLastSearchTerm={setLastSearchTerm}
          lastSearchTerm={initialSearchTerm}
          routerPageNumber={2}
        />
      </MemoryRouter>
    );

    const searchButton = screen.getByRole('button', { name: /search/i });
    const form = searchButton.closest('form');
    if (!form) {
      throw new Error('Form not found');
    }
    fireEvent.submit(form);

    expect(mockNavigate).toHaveBeenCalledWith('/page/1');
    expect(setFetchedItemsToState).not.toHaveBeenCalled();
  });
});
