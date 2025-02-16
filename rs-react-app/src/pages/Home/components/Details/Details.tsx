import { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Details.module.css';
import { useParams } from 'react-router';
import { Loader } from '../../../../sharedComponents/Loader/Loader';
import { useGetStarWarsPersonByIdQuery } from '../../../../slices/api/starWarsApiSlice';
import { ThemeContext } from '../../../../context/themeContext';

export const Details: FC = () => {
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);

  const { itemName: characterName, pageNumber } = useParams<{
    itemName?: string;
    pageNumber?: string;
  }>();

  const {
    data: item,
    error,
    isFetching,
  } = useGetStarWarsPersonByIdQuery(characterName || '');

  const handleClose = () => {
    navigate(`/page/${pageNumber || 1}`, { replace: true });
  };

  const isError = error ? true : false;

  return (
    <div className={style.detailsContainer} onClick={handleClose}>
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
