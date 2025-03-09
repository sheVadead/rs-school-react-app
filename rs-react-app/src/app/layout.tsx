'use client';

import React, { useState } from 'react';

import { ReactNode } from 'react';
import { Providers } from './providers';
import { Themes } from '../types/enums';
import '../styles/global.css';

const RootLayout = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState(Themes.LIGHT);

  return (
    <html>
      <body className={`theme-${theme}`}>
        {
          <Providers theme={theme}>
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
          </Providers>
        }
      </body>
    </html>
  );
};

export default RootLayout;
