import { FC, useState } from 'react';
import { SearchInput } from './components/SearchInput/SearchInput';
import './HomePage.module.css';
import { StarWarsPerson } from '../../services/starWarsApiClient';

export type HomePageState = {
  items: StarWarsPerson[];
  isLoading: boolean;
  isError: boolean;
  isErrorBoundaryError: boolean;
};

export const HomePage: FC = () => {
  const [_, setIsErrorBoundaryError] = useState<boolean>(false);

  return (
    <>
      <main>
        <SearchInput />
        <button
          onClick={() => {
            setIsErrorBoundaryError(() => {
              throw new Error('Test error for ErrorBoundary');
            });
          }}
        >
          Trigger Error Boundary error
        </button>
      </main>
    </>
  );
};
