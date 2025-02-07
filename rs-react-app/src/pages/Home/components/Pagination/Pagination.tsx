import { ReactNode } from 'react';
import style from './Pagination.module.css';
import { useNavigate } from 'react-router';

type PaginationProps = {
  children: ReactNode;
  pageCount: number;
};

export const Pagination = ({ children, pageCount }: PaginationProps) => {
  const navigate = useNavigate();

  const handlePageChange = (newPage: number) => {
    navigate(`/page/${newPage}`);
  };

  return (
    <div className={style.container}>
      <div>
        {Array.from({ length: pageCount }, (_, i) => i + 1).map(
          (pageNumber, index) => {
            return (
              <button key={index} onClick={() => handlePageChange(pageNumber)}>
                {pageNumber}
              </button>
            );
          }
        )}
      </div>
      {children}
    </div>
  );
};
