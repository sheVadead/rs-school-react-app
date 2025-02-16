import { FormEvent, useContext, useRef } from 'react';
import styles from './SearchInput.module.css';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../../../context/themeContext';

interface SearchInputProps {
  setLastSearchTerm: (value: string) => void;
  lastSearchTerm: string;
  routerPageNumber: number;
}

export const SearchInput: React.FC<SearchInputProps> = (
  props: SearchInputProps
): JSX.Element => {
  const theme = useContext(ThemeContext);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { setLastSearchTerm, lastSearchTerm, routerPageNumber } = props;
  const navigate = useNavigate();

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      const searchTerm = inputRef.current.value;
      setLastSearchTerm(searchTerm);
      console.log('Submitted search term:', searchTerm);
    }

    if (routerPageNumber !== 1) {
      navigate('/page/1');
      return;
    }
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      className={`${styles['form-container']} ${styles[theme]}`}
    >
      <input
        type="text"
        defaultValue={lastSearchTerm}
        ref={inputRef}
        className={`${styles['searchInput']} ${styles[theme]}`}
      />
      <button type="submit" className={`${styles.button} ${styles[theme]}`}>
        Search
      </button>
    </form>
  );
};
