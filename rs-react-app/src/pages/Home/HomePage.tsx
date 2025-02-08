import { FC, useEffect, useState } from 'react';
import { SearchInput } from './components/SearchInput/SearchInput';
import './HomePage.module.css';
import { StarWarsPerson } from '../../services/starWarsApiClient';
import { Loader } from '../../sharedComponents/Loader/Loader';
import { ItemList } from './components/ItemList/ItemList';
import { useFetchItems } from './components/SearchInput/hooks/useFetchItems';
import { useLocalStorage } from './components/SearchInput/hooks/useSearchQuery';
import { useParams, useSearchParams } from 'react-router-dom';
import { Pagination } from './components/Pagination/Pagination';
import { Details } from './components/Details/Details';

export type HomePageState = {
  items: StarWarsPerson[];
  isLoading: boolean;
  isError: boolean;
  isErrorBoundaryError: boolean;
};

export const HomePage: FC = () => {
  const [, setIsErrorBoundaryError] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const detailsOpen = searchParams.has('details');
  const [lastSearchTerm, setLastSearchTerm] = useLocalStorage(
    'lastSearchTerm',
    ''
  );
  const { pageNumber } = useParams<{ pageNumber: string }>();

  const { items, isLoading, isError, count, setFetchedItemsToState } =
    useFetchItems(lastSearchTerm, parseInt(pageNumber || '1', 10));

  useEffect(() => {
    setFetchedItemsToState();
  }, [pageNumber]);

  return (
    <>
      <main>
        <SearchInput
          setLastSearchTerm={setLastSearchTerm}
          setFetchedItemsToState={setFetchedItemsToState}
          lastSearchTerm={lastSearchTerm}
          routerPageNumber={parseInt(pageNumber || '1', 10)}
        />
        <button
          onClick={() => {
            setIsErrorBoundaryError(() => {
              throw new Error('Test error for ErrorBoundary');
            });
          }}
        >
          Trigger Error Boundary error
        </button>
        <Pagination pageCount={count}>
          {isLoading ? (
            <Loader />
          ) : (
            <ItemList response={{ items, count }} isError={isError} />
          )}
        </Pagination>

        {detailsOpen && (
          <div className="rightPanel">
            <Details />
          </div>
        )}
      </main>
    </>
  );
};
