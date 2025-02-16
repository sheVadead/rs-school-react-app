import React, { useState } from 'react';
import { HomePage } from './pages/Home/HomePage';
import { ErrorBoundary } from './sharedComponents/ErrorBoundary/ErrorBoundary';
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import ErrorPage from './pages/Error/NotFoundPage';
import { Details } from './pages/Home/components/Details/Details';
import { ThemeContext } from './context/themeContext';
import './assets/styles/App.css';
import { Themes } from './types/enums';

const router = createBrowserRouter([
  {
    path: '/',
    loader: () => redirect('/page/1'),
  },
  {
    path: '/page/:pageNumber',
    element: <HomePage />,
    children: [
      {
        path: 'details/:itemName',
        element: <Details />,
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

export const App: React.FC = () => {
  const [theme, setTheme] = useState(Themes.LIGHT);
  return (
    <>
      <ThemeContext.Provider value={theme}>
        <>
          <label htmlFor="theme-switcher">Change theme</label>
          <input
            type="checkbox"
            onChange={() => {
              setTheme((prev) =>
                prev === Themes.LIGHT ? Themes.DARK : Themes.LIGHT
              );
            }}
            name="theme-switcher"
            id="theme-switcher"
          />
        </>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </ThemeContext.Provider>
    </>
  );
};
