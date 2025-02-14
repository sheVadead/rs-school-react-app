import { useNavigate, useParams } from 'react-router-dom';
import { StarWarsPerson } from '../../../../services/starWarsApiClient';
import style from './Item.module.css';
import { useAppDispatch } from '../../../../reduxHooks';
import {
  addItem,
  removeItem,
  StarWarsState,
} from '../../../../selectors/starWarsItems';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { ThemeContext } from '../../../../context/themeContext';

type ItemProps = {
  item: StarWarsPerson;
};

export const Item = ({ item }: ItemProps) => {
  const theme = useContext(ThemeContext);

  const navigate = useNavigate();
  const { pageNumber } = useParams<{
    pageNumber: string;
  }>();
  const dispatch = useAppDispatch();
  const handleButtonClick = (id: string) => {
    navigate(`/page/${pageNumber || 1}/details/${id}`);
  };

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
      <div
        onClick={() => handleButtonClick(id)}
        className={`${style.card} ${style[theme]}`}
        key={item.name}
        data-testid={id}
      >
        <h3>{item.name}</h3>
      </div>
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
