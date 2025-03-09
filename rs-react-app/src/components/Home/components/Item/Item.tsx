import React from 'react';
import { StarWarsPerson } from '../../../../services/starWarsApiClient';
import style from './Item.module.css';
import { useAppDispatch } from '../../../../reduxHooks';
import {
  addItem,
  removeItem,
  StarWarsState,
} from '../../../../slices/starWarsItems';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { ThemeContext } from '../../../../context/themeContext';
import Link from 'next/link';
import { useRouter } from 'next/router';

type ItemProps = {
  item: StarWarsPerson;
};

export const Item = ({ item }: ItemProps) => {
  const theme = useContext(ThemeContext);
  const router = useRouter();
  const { pageNumber } = router.query;

  const dispatch = useAppDispatch();

  const selectedItems = useSelector(
    (state: { starWars: StarWarsState }) => state.starWars.selectedItems
  );

  const handleCheckboxClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(addItem(item));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const id = item.url.split('/').slice(-2)[0];

  return (
    <div className={`${style['card-wrapper']} ${style[theme]}`}>
      <Link
        href={`/page/${pageNumber}/details/${id}`}
        className={`${style.card} ${style[theme]}`}
        key={item.name}
        data-testid={id}
      >
        <h3>{item.name}</h3>
      </Link>
      <input
        onChange={(e) => handleCheckboxClick(e)}
        type="checkbox"
        checked={selectedItems.some(
          (stateItem) => stateItem.name === item.name
        )}
        name="select-person"
        id=""
      />
    </div>
  );
};
