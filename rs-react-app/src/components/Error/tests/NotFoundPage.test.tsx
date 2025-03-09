import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorPage from '../NotFoundPage';
import '@testing-library/jest-dom';

describe('NotFoundPage Component', () => {
  it('renders the 404 Not found message', () => {
    const { container } = render(<ErrorPage />);

    const errorDiv = container.querySelector('#error-page');
    expect(errorDiv).toBeInTheDocument();
    expect(errorDiv).toHaveTextContent('404 Not found');
  });

  it('contains an h2 element with the correct error message', () => {
    render(<ErrorPage />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('404 Not found');
  });
});
