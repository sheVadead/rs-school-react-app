import { ChangeEvent, FormEvent, useEffect } from 'react';
import styles from './SearchInput.module.css';
import { useLocalStorage } from './hooks/useSearchQuery';
import { useFetchItems } from './hooks/useFetchItems';
import { Loader } from '../../../../sharedComponents/Loader/Loader';
import { ItemList } from '../ItemList/ItemList';

type SearchInputProps = object;

export const SearchInput: React.FC<SearchInputProps> = () => {
  const [lastSearchTerm, setLastSearchTerm] = useLocalStorage(
    'lastSearchTerm',
    ''
  );

  const { items, isLoading, isError, setFetchedItemsToState } =
    useFetchItems(lastSearchTerm);

  useEffect(() => {
    setFetchedItemsToState();
  }, [lastSearchTerm]);

  const handleOnInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLastSearchTerm(value);
  };

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFetchedItemsToState();
  };

  return (
    <>
      <form onSubmit={handleOnSubmit} className={styles.form}>
        <input
          type="text"
          value={lastSearchTerm}
          onChange={handleOnInputChange}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>
      {isLoading ? <Loader /> : <ItemList items={items} isError={isError} />}
    </>
  );
};
