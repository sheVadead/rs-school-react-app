import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Details.module.css';
import { useParams } from 'react-router';
import { useFetchStarWarsPerson } from '../SearchInput/hooks/useFetchStarWarsPerson';
import { Loader } from '../../../../sharedComponents/Loader/Loader';

export const Details: FC = () => {
  const navigate = useNavigate();
  const { itemName: characterName, pageNumber } = useParams<{
    itemName: string;
    pageNumber: string;
  }>();

  const { item, isLoading, isError, setFetchedPersonToState } =
    useFetchStarWarsPerson(characterName || '');
  useEffect(() => {
    if (!characterName) return;

    setFetchedPersonToState();
  }, [characterName]);

  const handleClose = () => {
    navigate(`/page/${pageNumber || 1}`, { replace: true });
  };

  if (!characterName) return null;

  return (
    <div className={style.detailsContainer} onClick={handleClose}>
      <div className={style.detailsPanel} onClick={(e) => e.stopPropagation()}>
        {isError && <h3>Something went wrong. Try again later</h3>}
        {isLoading ? (
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
