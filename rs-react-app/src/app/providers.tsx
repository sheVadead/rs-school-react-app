import React, { ReactNode, useState } from 'react';
import { ThemeContext } from '../context/themeContext';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { Themes } from '../types/enums';

export const Providers = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState(Themes.LIGHT);

  return (
    <Provider store={store}>
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
        {children}
      </ThemeContext.Provider>
    </Provider>
  );
};