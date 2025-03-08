import React from 'react';
import { FC, useContext, useState } from 'react';
import { SearchInput } from './components/SearchInput/SearchInput';
import style from './HomePage.module.css';
import { StarWarsPerson } from '../../services/starWarsApiClient';
import { Loader } from '../../sharedComponents/Loader/Loader';
import { ItemList } from './components/ItemList/ItemList';
import { useLocalStorage } from './components/SearchInput/hooks/useSearchQuery';
import { Pagination } from './components/Pagination/Pagination';
import { Flyout } from './components/Flyout/Flyout';
import { ThemeContext } from '../../context/themeContext';
import { useGetStarWarsPersonsBySearchQuery } from '../../slices/api/starWarsApiSlice';
import { useRouter } from 'next/router';

export type HomePageState = {
  items: StarWarsPerson[];
  isLoading: boolean;
  isError: boolean;
  isErrorBoundaryError: boolean;
};

type HomePageProps = {
  pageNumber: string;
};

export const HomePage: FC<HomePageProps> = ({ pageNumber }: HomePageProps) => {
  const [isErrorBoundary, setIsErrorBoundaryError] = useState<boolean>(false);
  const [lastSearchTerm, setLastSearchTerm] = useLocalStorage(
    'lastSearchTerm',
    ''
  );
  const {
    query: { details },
    replace,
  } = useRouter();
  const theme = useContext(ThemeContext);

  const { data, error, isFetching } = useGetStarWarsPersonsBySearchQuery({
    searchValue: lastSearchTerm,
    pageNumber: parseInt(pageNumber || '1', 10),
  });

  const handleOutletClose = () => {
    if (details) {
      replace(`/page/${pageNumber}`);
    }
  };
  if(isErrorBoundary) {
    throw new Error('Test error for ErrorBoundary');

  }
  const isError = error ? true : false;
  return (
    <>
      {details && (
        <div
          data-testid="background"
          className={style[`background`]}
          onClick={() => handleOutletClose()}
        />
      )}
      <main className={`main ${style['main']} theme-${theme}`}>
        <SearchInput
          setLastSearchTerm={setLastSearchTerm}
          lastSearchTerm={lastSearchTerm}
          routerPageNumber={parseInt(pageNumber || '1', 10)}
        />
        <Flyout />
        <button
          onClick={() => {
            setIsErrorBoundaryError(true);
          }}
        >
          Trigger Error Boundary error
        </button>
        <Pagination pageCount={data?.pageCount}>
          {isFetching ? (
            <Loader />
          ) : (
            <ItemList items={data?.results} isError={isError} />
          )}
        </Pagination>
      </main>
    </>
  );
};
