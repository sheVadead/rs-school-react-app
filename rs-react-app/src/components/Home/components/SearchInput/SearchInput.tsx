import React from 'react';
import { FormEvent, useContext, useRef } from 'react';
import styles from './SearchInput.module.css';
import { ThemeContext } from '../../../../context/themeContext';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  const { setLastSearchTerm, lastSearchTerm, routerPageNumber } = props;

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      const searchTerm = inputRef.current.value;
      setLastSearchTerm(searchTerm);
    }

    if (routerPageNumber !== 1) {
      router.replace('/page/1');
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
