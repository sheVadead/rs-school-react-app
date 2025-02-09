import { useState } from 'react';
import {
  fetchItemByURL,
  StarWarsPerson,
} from '../../../../../services/starWarsApiClient';

export const useFetchStarWarsPerson = (url: string) => {
  const [item, setItem] = useState<StarWarsPerson | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);

  const updateStateWithFetchedItems = (response: StarWarsPerson) => {
    setItem(response);
  };

  const setFetchedPersonToState = async () => {
    try {
      setIsLoading(true);
      const response = await fetchItemByURL(url);
      updateStateWithFetchedItems(response);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { item, isLoading, isError, setFetchedPersonToState };
};
