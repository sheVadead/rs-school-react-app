import { FC } from 'react';
import { useSelector } from 'react-redux';
import { clearItems, StarWarsState } from '../../../../slices/starWarsItems';
import { useAppDispatch } from '../../../../reduxHooks';
import style from './Flyout.module.css';
import { useJsonToCsv } from './hooks/useJsonToCsv';

export const Flyout: FC = () => {
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
            <button onClick={() => handleOnClearItems()} type="button">
              Unselect all
            </button>
            <a
              href={url}
              download={`${selectedItems.length}_${selectedItems.length === 1 ? 'person' : 'persons'}`}
            >
              Download
            </a>
          </div>
        </>
      )}
    </div>
  );
};
