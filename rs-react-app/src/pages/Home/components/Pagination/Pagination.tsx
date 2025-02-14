import { ReactNode, useContext } from 'react';
import style from './Pagination.module.css';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../../../../context/themeContext';
import { Themes } from '../../../../App';

type PaginationProps = {
  children: ReactNode;
  pageCount: number;
};

function createNumberArray(n: number): number[] {
  return Array.from({ length: n }, (_, i) => i + 1);
}

export const Pagination = ({ children, pageCount }: PaginationProps) => {
  const theme = useContext(ThemeContext);

  return (
    <div className={style.container}>
      <div className={style.navigation}>
        {createNumberArray(pageCount).map((pageNumber, index) => (
          <NavLink
            style={({ isActive }) => {
              const style = {} as Record<string, string>;
              if (isActive) {
                if (theme === Themes.LIGHT) {
                  style['color'] = 'gray';
                } else {
                  style['color'] = 'wheat';
                }
              } else {
                if (theme === Themes.LIGHT) {
                  style['color'] = 'black';
                } else {
                  style['color'] = 'white';
                }
              }
              return style;
            }}
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
