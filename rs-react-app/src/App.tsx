import React from 'react';
import './assets/styles/App.css';
import { HomePage } from './pages/Home/HomePage';
import { ErrorBoundary } from './sharedComponents/ErrorBoundary/ErrorBoundary';

export const App: React.FC = () => {
  return (
    <>
      <ErrorBoundary>
        <HomePage />
      </ErrorBoundary>
    </>
  );
};
