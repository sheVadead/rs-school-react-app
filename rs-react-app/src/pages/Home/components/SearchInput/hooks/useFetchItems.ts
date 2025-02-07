import { useState } from 'react';
import {
  StarWarsApiResponse,
  StarWarsPerson,
} from '../../../../../services/starWarsApiClient';

export const useFetchItems = (searchValue: string, pageNumber: number) => {
  const [items, setItems] = useState<StarWarsPerson[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);
  const [count, setCount] = useState(1);

  const fetchItems = async () => {
    const response = await fetch(
      `https://swapi.dev/api/people/?search=${searchValue}&page=${pageNumber}`
    );

    if (!response.ok) {
      throw new Error('Something went wrong');
    }

    return await response.json();
  };

  const updateStateWithFetchedItems = (response: StarWarsApiResponse) => {
    setItems(response.results);
    setCount(response.count);
  };

  const setFetchedItemsToState = async () => {
    try {
      setIsLoading(true);
      const response = await fetchItems();
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
