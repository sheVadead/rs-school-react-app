import { FC } from 'react';
import { StarWarsPerson } from '../../../../services/starWarsApiClient';
import style from './ItemList.module.css';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

type ItemListProps = {
  response: { items: StarWarsPerson[]; count: number };
  isError: boolean;
};

export const ItemList: FC<ItemListProps> = ({ response, isError }) => {
  const navigate = useNavigate();
  const { pageNumber } = useParams<{
    pageNumber: string;
  }>();

  const handleButtonClick = (id: string) => {
    navigate(`/page/${pageNumber || 1}/details/${id}`);
  };

  return (
    <div className={isError ? style['error-container'] : style.container}>
      {isError ? (
        <h3>Something went wrong. Try again later</h3>
      ) : (
        <div className={style.cardContainer}>
          {response.items.map((item) => {
            const id = item.url.split('/').slice(-2)[0];
            return (
              <div
                onClick={() => handleButtonClick(id)}
                className={style.card}
                key={item.name}
                data-test-id={id}
              >
                <h3>{item.name}</h3>
              </div>
            );
          })}

          <div
            style={{ flex: 1, padding: '20px', borderLeft: '1px solid gray' }}
          >
            <Outlet context={{}} />
          </div>
        </div>
      )}
    </div>
  );
};
