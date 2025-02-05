import { useState } from 'react';
import {
  StarWarsApiResponse,
  StarWarsPerson,
} from '../../../../../services/starWarsApiClient';

export const useFetchItems = (searchValue: string) => {
  const [items, setItems] = useState<StarWarsPerson[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);

  const fetchItems = async () => {
    const response = await fetch(
      `https://swapi.dev/api/people/?search=${searchValue}`
    );

    if (!response.ok) {
      throw new Error('Something went wrong');
    }
    return await response.json();
  };

  const updateStateWithFetchedItems = (response: StarWarsApiResponse) => {
    setItems(response.results);
  };

  const setFetchedItemsToState = async () => {
    try {
      setIsloading(true);
      const response = await fetchItems();
      updateStateWithFetchedItems(response);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(true);
    } finally {
      setIsloading(false);
    }
  };

  return { items, isLoading, isError, setFetchedItemsToState };
};
