import React from 'react';
import { FC, useContext } from 'react';
import style from './Details.module.css';
import { Loader } from '../../../../sharedComponents/Loader/Loader';
import { useGetStarWarsPersonByIdQuery } from '../../../../slices/api/starWarsApiSlice';
import { ThemeContext } from '../../../../context/themeContext';
import { useRouter } from 'next/router';

export const Details: FC = () => {
  const theme = useContext(ThemeContext);
  const router = useRouter();

  const { details } = router.query;

  const {
    data: item,
    error,
    isFetching,
  } = useGetStarWarsPersonByIdQuery((details as string) || '');

  const handleClose = () => {
    router.replace(`/page/${router.query.pageNumber || 1}`);
  };

  const isError = error ? true : false;

  return (
    <div
      data-testid="background"
      className={style.detailsContainer}
      onClick={handleClose}
    >
      <div
        className={`${style[`detailsPanel-${theme}`]} ${theme}`}
        onClick={(e) => e.stopPropagation()}
      >
        {isError && <h3>Something went wrong. Try again later</h3>}
        {isFetching ? (
          <Loader />
        ) : (
          !isError && (
            <>
              <h3>{item?.name}</h3>
              <p>Height: {item?.height}</p>
              <p>Mass: {item?.mass}</p>
              <p>Hair Color: {item?.hair_color}</p>
              <p>Eye Color: {item?.eye_color}</p>
              <p>Birth Year: {item?.birth_year}</p>
              <p>Gender: {item?.gender}</p>
            </>
          )
        )}
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};
