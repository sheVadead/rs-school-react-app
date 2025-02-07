import { FC, useEffect, useState } from 'react';
import { SearchInput } from './components/SearchInput/SearchInput';
import './HomePage.module.css';
import { StarWarsPerson } from '../../services/starWarsApiClient';
import { Loader } from '../../sharedComponents/Loader/Loader';
import { ItemList } from './components/ItemList/ItemList';
import { useFetchItems } from './components/SearchInput/hooks/useFetchItems';
import { useLocalStorage } from './components/SearchInput/hooks/useSearchQuery';

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
  const { items, isLoading, isError, setFetchedItemsToState } =
    useFetchItems(lastSearchTerm);

  useEffect(() => {
    setFetchedItemsToState();
  }, [lastSearchTerm]);

  return (
    <>
      <main>
        <SearchInput
          setLastSearchTerm={setLastSearchTerm}
          setFetchedItemsToState={setFetchedItemsToState}
          lastSearchTerm={lastSearchTerm}
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
        {isLoading ? <Loader /> : <ItemList items={items} isError={isError} />}
      </main>
    </>
  );
};
