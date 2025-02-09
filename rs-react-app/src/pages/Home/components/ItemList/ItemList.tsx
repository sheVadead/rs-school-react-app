import { FC } from 'react';
import { StarWarsPerson } from '../../../../services/starWarsApiClient';
import style from './ItemList.module.css';
import { Outlet } from 'react-router-dom';
import { Item } from '../Item/Item';

type ItemListProps = {
  items: StarWarsPerson[];
  isError: boolean;
};

export const ItemList: FC<ItemListProps> = ({ items, isError }) => {
  console.log(items);
  return (
    <div className={isError ? style['error-container'] : style.container}>
      {!items.length && <h3>No items found</h3>}
      {isError ? (
        <h3>Something went wrong. Try again later</h3>
      ) : (
        <div className={style.cardContainer}>
          {items.map((item, index) => (
            <Item key={index} item={item} />
          ))}

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
