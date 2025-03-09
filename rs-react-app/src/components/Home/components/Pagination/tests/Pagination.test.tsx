import React from 'react';
import { render, screen } from '@testing-library/react';
import { Pagination } from '../Pagination';
import '@testing-library/jest-dom';
import { Themes } from '../../../../../types/enums';
import { ThemeContext } from '../../../../../context/themeContext';

jest.mock('next/router', () => ({
  useRouter: jest
    .fn()
    .mockReturnValue({ asPath: '/page/1', query: { pageNumber: '1' } }),
}));

describe('Pagination Component', () => {
  it('renders correct number of page links based on pageCount', () => {
    const pageCount = 5;
    render(
      <Pagination pageCount={pageCount}>
        <div>Child content</div>
      </Pagination>
    );

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(pageCount);

    links.forEach((link, index) => {
      expect(link).toHaveTextContent(`${index + 1}`);
      expect(link.getAttribute('href')).toBe(`/page/${index + 1}`);
    });
  });

  it('renders children correctly', () => {
    render(
      <Pagination pageCount={3}>
        <div>Extra content rendered as child</div>
      </Pagination>
    );
    expect(
      screen.getByText(/Extra content rendered as child/i)
    ).toBeInTheDocument();
  });

  it('renders links with correct text and href attributes', () => {
    render(
      <Pagination pageCount={5}>
        {' '}
        <div>Extra content rendered as child</div>
      </Pagination>
    );

    const links = screen.getAllByRole('link');
    links.forEach((link, index) => {
      expect(link).toHaveTextContent(`${index + 1}`);
      expect(link.getAttribute('href')).toBe(`/page/${index + 1}`);
    });
  });

  it('applies correct styles based on theme and active page', () => {
    const theme = Themes.LIGHT;
    render(
      <ThemeContext.Provider value={theme}>
        <Pagination pageCount={5}>
          {' '}
          <div>Extra content rendered as child</div>
        </Pagination>
      </ThemeContext.Provider>
    );

    const links = screen.getAllByRole('link');
    links.forEach((link, index) => {
      const expectedColor =
        index + 1 === 1
          ? theme === Themes.LIGHT
            ? 'gray'
            : 'wheat'
          : theme === Themes.LIGHT
            ? 'black'
            : 'white';
      expect(link).toHaveStyle(`color: ${expectedColor}`);
    });
  });
});
