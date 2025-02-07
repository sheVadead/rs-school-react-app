import { ReactNode } from 'react';
import style from './Pagination.module.css';
import { NavLink } from 'react-router-dom';

type PaginationProps = {
  children: ReactNode;
  pageCount: number;
};

export const Pagination = ({ children, pageCount }: PaginationProps) => {
  return (
    <div className={style.container}>
      <div className={style.navigation}>
        {Array.from({ length: pageCount }, (_, i) => i + 1).map(
          (pageNumber, index) => (
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? 'gray' : 'rgba(255, 255, 255, 0.87)',
              })}
              key={index}
              to={`/page/${pageNumber}`}
            >
              {pageNumber}{' '}
            </NavLink>
          )
        )}
      </div>
      {children}
    </div>
  );
};
