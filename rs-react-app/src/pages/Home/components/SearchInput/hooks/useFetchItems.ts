import { useState } from 'react';
import {
  fetchItems,
  StarWarsApiResponse,
  StarWarsPerson,
} from '../../../../../services/starWarsApiClient';

export const useFetchItems = (searchValue: string, pageNumber: number) => {
  const [items, setItems] = useState<StarWarsPerson[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);
  const [count, setCount] = useState(1);

  const updateStateWithFetchedItems = (response: StarWarsApiResponse) => {
    setItems(response.results);
    setCount(Math.ceil(response.count / 10));
  };

  const setFetchedItemsToState = async () => {
    try {
      setIsLoading(true);
      const response = await fetchItems(searchValue, pageNumber);
      updateStateWithFetchedItems(response);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { items, isLoading, isError, count, setFetchedItemsToState };
};
