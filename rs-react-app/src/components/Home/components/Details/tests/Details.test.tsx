import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Details } from '../Details';
import '@testing-library/jest-dom';
import { useRouter, useParams } from 'next/navigation';

const mockUseGetStarWarsPersonByIdQuery = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));

jest.mock('../../../../../slices/api/starWarsApiSlice', () => ({
  useGetStarWarsPersonByIdQuery: () => mockUseGetStarWarsPersonByIdQuery(),
  useGetStarWarsPersonsBySearchQuery: jest.fn(),
}));

describe('Details Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });

    (useParams as jest.Mock).mockReturnValue({
      details: '11',
    });

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
      isFetching: false,
      error: null,
    });
  });

  it('renders correctly', () => {
    render(<Details />);

    expect(screen.getByText(/Close/i)).toBeInTheDocument();
  });

  it('displays loading state', () => {
    mockUseGetStarWarsPersonByIdQuery.mockReturnValueOnce({ isFetching: true });
    render(<Details />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('displays error message', () => {
    mockUseGetStarWarsPersonByIdQuery.mockReturnValueOnce({ error: true });

    render(<Details />);

    expect(
      screen.getByText(/Something went wrong. Try again later/i)
    ).toBeInTheDocument();
  });

  it('displays character details', () => {
    render(<Details />);

    expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
    expect(screen.getByText(/Height: 172/i)).toBeInTheDocument();
    expect(screen.getByText(/Mass: 77/i)).toBeInTheDocument();
    expect(screen.getByText(/Hair Color: blond/i)).toBeInTheDocument();
    expect(screen.getByText(/Eye Color: blue/i)).toBeInTheDocument();
    expect(screen.getByText(/Birth Year: 19BBY/i)).toBeInTheDocument();
    expect(screen.getByText(/Gender: male/i)).toBeInTheDocument();
  });

  it('navigates back on close button click', () => {
    const mockReplace = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      query: { details: '11' },
      replace: mockReplace,
    });

    render(<Details />);

    fireEvent.click(screen.getByText(/Close/i));
    expect(mockReplace).toHaveBeenCalledWith('/page/1');
  });
});
