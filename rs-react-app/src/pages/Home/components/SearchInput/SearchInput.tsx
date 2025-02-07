import { ChangeEvent, FormEvent } from 'react';
import styles from './SearchInput.module.css';

interface SearchInputProps {
  setLastSearchTerm: (value: string) => void;
  setFetchedItemsToState: () => void;
  lastSearchTerm: string;
}

export const SearchInput: React.FC<SearchInputProps> = (
  props: SearchInputProps
): JSX.Element => {
  const { setLastSearchTerm, setFetchedItemsToState, lastSearchTerm } = props;

  const handleOnInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLastSearchTerm(value);
  };

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFetchedItemsToState();
  };

  return (
    <form onSubmit={handleOnSubmit} className={styles['form-container']}>
      <input
        type="text"
        value={lastSearchTerm}
        onChange={handleOnInputChange}
        className={styles['searchInput']}
      />
      <button type="submit" className={styles.button}>
        Search
      </button>
    </form>
  );
};
