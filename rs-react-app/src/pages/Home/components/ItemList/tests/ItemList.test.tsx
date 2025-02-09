import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ItemList } from '../ItemList';
import '@testing-library/jest-dom';
import {
  mockedItemList,
  mockedItemListResponse,
} from '../../../../../../__mocks__';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('ItemList Component', () => {
  it('renders correctly', () => {
    render(
      <MemoryRouter initialEntries={['/page/1']}>
        <Routes>
          <Route
            path="/page/:pageNumber"
            element={<ItemList items={mockedItemList} isError={false} />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Leya Skywalker/i)).toBeInTheDocument();
    expect(screen.getByText(/Darth Vader/i)).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(
      <MemoryRouter initialEntries={['/page/1']}>
        <Routes>
          <Route
            path="/page/:pageNumber"
            element={<ItemList items={mockedItemList} isError={true} />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText(/Something went wrong. Try again later/i)
    ).toBeInTheDocument();
  });

  it('renders the specified number of cards', () => {
    render(
      <MemoryRouter initialEntries={['/page/1']}>
        <Routes>
          <Route
            path="/page/:pageNumber"
            element={<ItemList items={mockedItemList} isError={false} />}
          />
        </Routes>
      </MemoryRouter>
    );

    const cards = screen.getAllByRole('heading');
    expect(cards).toHaveLength(mockedItemListResponse.items.length);
  });

  it('displays appropriate message if no cards are present', () => {
    render(
      <MemoryRouter initialEntries={['/page/1']}>
        <Routes>
          <Route
            path="/page/:pageNumber"
            element={<ItemList items={[]} isError={false} />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/No items found/i)).toBeInTheDocument();
  });
});
