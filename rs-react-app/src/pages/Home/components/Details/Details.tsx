import { FC, useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { StarWarsPerson } from '../../../../services/starWarsApiClient';
import style from './Details.module.css';

export const Details: FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<StarWarsPerson | null>(null);
  const [loading, setLoading] = useState(true);

  const characterName = searchParams.get('details');
  console.log('characterName', characterName);
  useEffect(() => {
    console.log('characterName', characterName);
    if (!characterName) return;

    setLoading(true);
    setTimeout(() => {
      setCharacter({
        name: characterName,
        height: '180',
        mass: '75',
        hair_color: 'black',
        eye_color: 'brown',
        birth_year: '19BBY',
        gender: 'male',
      });
      setLoading(false);
    }, 1000);
  }, [characterName]);

  const handleClose = () => {
    searchParams.delete('details');
    navigate(`/?${searchParams.toString()}`);
  };

  if (!characterName) return null;

  return (
    <div className={style.detailsContainer} onClick={handleClose}>
      <div className={style.detailsPanel} onClick={(e) => e.stopPropagation()}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h3>{character?.name}</h3>
            <p>Height: {character?.height}</p>
            <p>Mass: {character?.mass}</p>
            <p>Hair Color: {character?.hair_color}</p>
            <p>Eye Color: {character?.eye_color}</p>
            <p>Birth Year: {character?.birth_year}</p>
            <p>Gender: {character?.gender}</p>
            <button onClick={handleClose}>Close</button>
          </>
        )}
      </div>
    </div>
  );
};
