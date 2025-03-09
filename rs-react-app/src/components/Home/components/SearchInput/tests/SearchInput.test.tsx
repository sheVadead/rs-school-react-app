import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchInput } from '../SearchInput';
import '@testing-library/jest-dom';
import { useRouter, useParams } from 'next/navigation';

const mockReplace = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));

describe('SearchInput Component', () => {
  const setLastSearchTerm = jest.fn();
  const setFetchedItemsToState = jest.fn();
  const initialSearchTerm = 'initial value';

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue({
      route: '/page/[pageNumber]',
      pathname: '',
      asPath: '',
      replace: mockReplace,
    });
    (useParams as jest.Mock).mockReturnValue({
      pageNumber: '1',
      details: '11',
    });
  });

  it('retrieves value from local storage upon mounting (via props)', () => {
    render(
      <SearchInput
        setLastSearchTerm={setLastSearchTerm}
        lastSearchTerm={initialSearchTerm}
        routerPageNumber={1}
      />
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue(initialSearchTerm);
  });

  it('submits the form and calls setFetchedItemsToState if routerPageNumber is 1', () => {
    render(
      <SearchInput
        setLastSearchTerm={setLastSearchTerm}
        lastSearchTerm={initialSearchTerm}
        routerPageNumber={1}
      />
    );

    const searchButton = screen.getByRole('button', { name: /search/i });
    const form = searchButton.closest('form');
    if (!form) {
      throw new Error('Form not found');
    }
    fireEvent.submit(form);

    expect(mockReplace).not.toHaveBeenCalled();
    expect(setLastSearchTerm).toHaveBeenCalledWith('initial value');
  });

  it('submits the form and navigates to "/page/1" if routerPageNumber is not 1', () => {
    render(
      <SearchInput
        setLastSearchTerm={setLastSearchTerm}
        lastSearchTerm={initialSearchTerm}
        routerPageNumber={2}
      />
    );

    const searchButton = screen.getByRole('button', { name: /search/i });
    const form = searchButton.closest('form');
    if (!form) {
      throw new Error('Form not found');
    }
    fireEvent.submit(form);

    expect(mockReplace).toHaveBeenCalledWith('/page/1');
    expect(setFetchedItemsToState).not.toHaveBeenCalled();
  });
});
