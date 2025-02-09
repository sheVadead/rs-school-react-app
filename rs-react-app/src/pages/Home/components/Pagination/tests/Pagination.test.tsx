import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Pagination } from '../Pagination';
import '@testing-library/jest-dom';

describe('Pagination Component', () => {
  it('renders correct number of page links based on pageCount', () => {
    const pageCount = 5;
    render(
      <MemoryRouter>
        <Pagination pageCount={pageCount}>
          <div>Child content</div>
        </Pagination>
      </MemoryRouter>
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
      <MemoryRouter>
        <Pagination pageCount={3}>
          <div>Extra content rendered as child</div>
        </Pagination>
      </MemoryRouter>
    );
    expect(
      screen.getByText(/Extra content rendered as child/i)
    ).toBeInTheDocument();
  });

  it('updates URL query parameter when page changes (active link styling)', () => {
    render(
      <MemoryRouter initialEntries={['/page/2']}>
        <Pagination pageCount={5}>
          <div>Child content</div>
        </Pagination>
      </MemoryRouter>
    );

    const links = screen.getAllByRole('link');

    links.forEach((link, index) => {
      const expectedColor = index === 1 ? 'gray' : 'rgba(8, 8, 8, 0.87)';
      expect(link).toHaveStyle(`color: ${expectedColor}`);
    });
  });
});
