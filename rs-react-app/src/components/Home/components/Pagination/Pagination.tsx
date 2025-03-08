import { ReactNode, useContext } from 'react';
import style from './Pagination.module.css';
import NavLink from 'next/link';
import { ThemeContext } from '../../../../context/themeContext';
import { Themes } from '../../../../types/enums';
import { useRouter } from 'next/router';

type PaginationProps = {
  children: ReactNode;
  pageCount?: number;
};

function createNumberArray(n: number): number[] {
  return Array.from({ length: n }, (_, i) => i + 1);
}

export const Pagination = ({ children, pageCount }: PaginationProps) => {
  const theme = useContext(ThemeContext);
  const router = useRouter();
  
const styleW = {
  color: router.asPath === `page/${router.query.pageNumber}`
    ? theme === Themes.LIGHT ? 'gray' : 'wheat'
    : theme === Themes.LIGHT ? 'black' : 'white'
}

  return (
    <div className={style.container}>
      <div className={style.navigation}>
        {createNumberArray(pageCount ?? 0).map((pageNumber, index) => (
          <NavLink style={styleW} key={index} href={`/page/${pageNumber}`}>
            {pageNumber}
          </NavLink>
        ))}
      </div>
      {children}
    </div>
  );
};
