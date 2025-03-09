"use client"

import React, { useContext } from 'react';

import { ReactNode } from 'react';
import { Providers } from './providers';
import { ThemeContext } from '../context/themeContext';

const RootLayout = ({ children }: { children: ReactNode }) => {
  const theme = useContext(ThemeContext);
  return (
    <html>
      <body className={`theme-${theme}`}>{<Providers>{children}</Providers>}</body>
    </html>
  );
};

export default RootLayout;