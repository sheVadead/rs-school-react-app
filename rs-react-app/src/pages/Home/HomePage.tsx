import { FC, useContext, useState } from 'react';
import { SearchInput } from './components/SearchInput/SearchInput';
import style from './HomePage.module.css';
import { StarWarsPerson } from '../../services/starWarsApiClient';
import { Loader } from '../../sharedComponents/Loader/Loader';
import { ItemList } from './components/ItemList/ItemList';
import { useLocalStorage } from './components/SearchInput/hooks/useSearchQuery';
import { useNavigate, useParams } from 'react-router-dom';
import { Pagination } from './components/Pagination/Pagination';
import { Flyout } from './components/Flyout/Flyout';
import { ThemeContext } from '../../context/themeContext';
import { useGetStarWarsPersonsBySearchQuery } from '../../slices/api/starWarsApiSlice';

export type HomePageState = {
  items: StarWarsPerson[];
  isLoading: boolean;
  isError: boolean;
  isErrorBoundaryError: boolean;
};

export const HomePage: FC = () => {
  const [, setIsErrorBoundaryError] = useState<boolean>(false);
  const [lastSearchTerm, setLastSearchTerm] = useLocalStorage(
    'lastSearchTerm',
    ''
  );
  const theme = useContext(ThemeContext);

  const { pageNumber, itemName } = useParams<{
    pageNumber: string;
    itemName?: string;
  }>();
  const navigate = useNavigate();

  const { data, error, isFetching } = useGetStarWarsPersonsBySearchQuery({
    searchValue: lastSearchTerm,
    pageNumber: parseInt(pageNumber || '1', 10),
  });

  const handleOutletClose = () => {
    if (itemName) {
      navigate(`/page/${pageNumber}`, { replace: true });
    }
  };
  const isError = error ? true : false;
  return (
    <>
      {itemName && (
        <div
          className={style[`background`]}
          onClick={() => handleOutletClose()}
        />
      )}
      <main className={`${style['main']} theme-${theme}`}>
        <SearchInput
          setLastSearchTerm={setLastSearchTerm}
          lastSearchTerm={lastSearchTerm}
          routerPageNumber={parseInt(pageNumber || '1', 10)}
        />
        <Flyout />
        <button
          onClick={() => {
            setIsErrorBoundaryError(() => {
              throw new Error('Test error for ErrorBoundary');
            });
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
