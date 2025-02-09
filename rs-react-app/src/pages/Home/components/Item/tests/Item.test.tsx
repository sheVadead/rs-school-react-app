import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Item } from '../Item';
import '@testing-library/jest-dom';
import { mockedItemDetails } from '../../../../../../__mocks__';

// Mock useNavigate and useParams.
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ pageNumber: '1' }),
  };
});

describe('Item Component', () => {
  it('renders the card with the correct item name', () => {
    render(
      <MemoryRouter>
        <Item item={mockedItemDetails} />
      </MemoryRouter>
    );
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });

  it('navigates to the details page when the card is clicked', () => {
    render(
      <MemoryRouter>
        <Item item={mockedItemDetails} />
      </MemoryRouter>
    );

    const cardElement = screen.getByTestId('test');
    fireEvent.click(cardElement);
    expect(mockNavigate).toHaveBeenCalledWith('/page/1/details/test');
  });

  it('triggers navigation which in the app leads to fetching detailed information', () => {
    render(
      <MemoryRouter>
        <Item item={mockedItemDetails} />
      </MemoryRouter>
    );
    const cardElement = screen.getByTestId('test');
    fireEvent.click(cardElement);
    expect(mockNavigate).toHaveBeenCalledWith('/page/1/details/test');
  });
});
