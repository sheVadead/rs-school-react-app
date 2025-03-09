import React from 'react';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '../ErrorBoundary';
import '@testing-library/jest-dom';

describe('ErrorBoundary Component', () => {
  const NormalChild = () => <div>Everything is fine</div>;

  it('renders children normally when no error is thrown', () => {
    render(
      <ErrorBoundary>
        <NormalChild />
      </ErrorBoundary>
    );

    expect(screen.getByText('Everything is fine')).toBeInTheDocument();
  });

  it('catches error and renders fallback UI', () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const BuggyComponent = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <BuggyComponent />
      </ErrorBoundary>
    );

    expect(
      screen.getByText(/Error while rendering the app/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Fix/i })).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });
});
