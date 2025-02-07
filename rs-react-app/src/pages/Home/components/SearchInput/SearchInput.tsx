import { ChangeEvent, FormEvent } from 'react';
import styles from './SearchInput.module.css';
import { useNavigate } from 'react-router-dom';

interface SearchInputProps {
  setLastSearchTerm: (value: string) => void;
  setFetchedItemsToState: () => void;
  lastSearchTerm: string;
  routerPageNumber: number;
}

export const SearchInput: React.FC<SearchInputProps> = (
  props: SearchInputProps
): JSX.Element => {
  const {
    setLastSearchTerm,
    setFetchedItemsToState,
    lastSearchTerm,
    routerPageNumber,
  } = props;
  const navigate = useNavigate();
  const handleOnInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const value = e.target.value;
    setLastSearchTerm(value);
  };

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (routerPageNumber !== 1) {
      console.log('HANDLE ON CHANGE ', routerPageNumber);
      navigate('/page/1');
      return;
    }

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
