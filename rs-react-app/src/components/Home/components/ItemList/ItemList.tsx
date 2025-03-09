import React from 'react';
import { FC } from 'react';
import { StarWarsPerson } from '../../../../services/starWarsApiClient';
import style from './ItemList.module.css';
import { Item } from '../Item/Item';
import { useParams } from 'next/navigation';
import { Details } from '../Details/Details';
import { QueryParams } from '../../../../types';

type ItemListProps = {
  items?: StarWarsPerson[];
  isError: boolean;
};

export const ItemList: FC<ItemListProps> = ({ items, isError }) => {
  const { details } = useParams<QueryParams>();

  return (
    <div className={isError ? style['error-container'] : style.container}>
      {!items?.length && <h3>No items found</h3>}
      {isError ? (
        <h3>Something went wrong. Try again later</h3>
      ) : (
        <div className={style.cardContainer}>
          {items?.map((item, index) => <Item key={index} item={item} />)}
        </div>
      )}
      {details && <Details />}
    </div>
  );
};
