import React from 'react';
import './assets/styles/App.css';
import { HomePage } from './pages/Home/HomePage';
import { ErrorBoundary } from './sharedComponents/ErrorBoundary/ErrorBoundary';
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import ErrorPage from './pages/Error/NotFoundPage';
import { Details } from './pages/Home/components/Details/Details';

const router = createBrowserRouter([
  {
    path: '/',
    loader: () => redirect('/page/1'),
    errorElement: <ErrorPage />,
  },
  {
    path: '/page/:pageNumber',
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'details/:itemName',
        element: <Details />,
      },
    ],
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
