import React from 'react';
import './assets/styles/App.css';
import { HomePage } from './pages/Home/HomePage';
import { ErrorBoundary } from './sharedComponents/ErrorBoundary/ErrorBoundary';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/Error/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
]);

export const App: React.FC = () => {
  return (
    <>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </>
  );
};
