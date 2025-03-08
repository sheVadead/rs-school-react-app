import React, { useState } from 'react';
import { ErrorBoundary } from '../sharedComponents/ErrorBoundary/ErrorBoundary';
import { AppProps } from 'next/app';
import { ThemeContext } from '../context/themeContext';
import { Themes } from '../types/enums';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import '../styles/global.css';

const App = ({ Component, pageProps }: AppProps) => {
  const [theme, setTheme] = useState(Themes.LIGHT);
  return (
    <ThemeContext.Provider value={theme}>
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
      <ErrorBoundary>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ErrorBoundary>
    </ThemeContext.Provider>
  );
};

export default App;
