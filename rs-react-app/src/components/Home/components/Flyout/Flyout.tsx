import React, { useContext } from 'react';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { clearItems, StarWarsState } from '../../../../slices/starWarsItems';
import { useAppDispatch } from '../../../../reduxHooks';
import style from './Flyout.module.css';
import { useJsonToCsv } from './hooks/useJsonToCsv';
import { ThemeContext } from '../../../../context/themeContext';

export const Flyout: FC = () => {
  const theme = useContext(ThemeContext);

  const selectedItems = useSelector(
    (state: { starWars: StarWarsState }) => state.starWars.selectedItems
  );

  const { url } = useJsonToCsv();
  const dispatch = useAppDispatch();

  const handleOnClearItems = () => {
    dispatch(clearItems());
  };

  return (
    <div className={style.flyOutContainer}>
      {!!selectedItems.length && (
        <>
          <h3>{`Selected: ${selectedItems.length} ${selectedItems.length === 1 ? 'item' : 'items'}`}</h3>
          <div className={style.buttonContainer}>
            <button
              className={style[theme]}
              onClick={() => handleOnClearItems()}
              type="button"
            >
              Unselect all
            </button>
            <a
              href={url}
              className={style[theme]}
              download={`${selectedItems.length}_${selectedItems.length === 1 ? 'person' : 'persons'}.csv`}
            >
              Download
            </a>
          </div>
        </>
      )}
    </div>
  );
};
