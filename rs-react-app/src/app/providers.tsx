import React, { ReactNode } from 'react';
import { ThemeContext } from '../context/themeContext';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { Themes } from '../types/enums';

type ProvidersProps = {
  children: ReactNode;
  theme: Themes;
};

export const Providers = ({ children, theme }: ProvidersProps) => {
  console.log(theme);
  return (
    <Provider store={store}>
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    </Provider>
  );
};
