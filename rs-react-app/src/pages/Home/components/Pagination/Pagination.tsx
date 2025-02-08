import { ReactNode } from 'react';
import style from './Pagination.module.css';
import { NavLink } from 'react-router-dom';

type PaginationProps = {
  children: ReactNode;
  pageCount: number;
};

function createNumberArray(n: number): number[] {
  return Array.from({ length: n }, (_, i) => i + 1);
}

export const Pagination = ({ children, pageCount }: PaginationProps) => {
  return (
    <div className={style.container}>
      <div className={style.navigation}>
        {createNumberArray(pageCount).map((pageNumber, index) => (
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? 'gray' : 'rgba(8, 8, 8, 0.87)',
            })}
            key={index}
            to={`/page/${pageNumber}`}
          >
            {pageNumber}{' '}
          </NavLink>
        ))}
      </div>
      {children}
    </div>
  );
};
