import { FC } from 'react';
import { StarWarsPerson } from '../../../../services/starWarsApiClient';
import style from './ItemList.module.css';
import { useNavigate, useSearchParams } from 'react-router-dom';

type ItemListProps = {
  response: { items: StarWarsPerson[]; count: number };
  isError: boolean;
};

export const ItemList: FC<ItemListProps> = ({ response, isError }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleClick = (name: string, url: string) => {
    searchParams.set('details', name.split(' ').join(''));
    navigate(`${searchParams.toString()}`);
  };
  return (
    <div className={isError ? style['error-container'] : style.container}>
      {isError ? (
        <h3>Something went wrong. Try again later</h3>
      ) : (
        <div className={style.cardContainer}>
          {response.items.map((item) => (
            <div
              onClick={() => handleClick(item.name, item.url)}
              className={style.card}
              key={item.name}
            >
              <h3>{item.name}</h3>
              {/* <div className={style.cardContainer}>
                <div className={style.cardColumn}>
                  <span>Height: {item.height}</span>
                  <span>Mass: {item.mass}</span>
                  <span>Hair color: {item.hair_color}</span>
                </div>
                <div className={style.cardColumn}>
                  <span>Eye color: {item.eye_color}</span>
                  <span>Birth year: {item.birth_year}</span>
                  <span>Gender: {item.gender}</span>
                </div>
              </div> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
