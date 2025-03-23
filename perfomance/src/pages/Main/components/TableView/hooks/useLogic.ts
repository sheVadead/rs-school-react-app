import { useCallback, useMemo, useState } from 'react';
import { Country } from '../../../../../types/country';
import { CountriesLocalStorage } from './useLocalStorage';

export enum SortOrder {
  DEFAULT = '',
  ASC = 'asc',
  DESC = 'desc',
}

export enum SortBy {
  DEFAULT = '',
  NAME = 'name',
  POPULATION = 'population',
}

export const useLogic = (
  data: Country[],
  visitedCountries: Record<string, boolean>,
) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filter, setFilterOption] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.DEFAULT);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.DEFAULT);

  const addVisitedCountry = useMemo(() => {
    if (!Object.keys(visitedCountries).length) return data;
    return data.map((item) => {
      return {
        ...item,
        visited: visitedCountries[item.name.common] ? true : false,
      };
    });
  }, [visitedCountries, data]);

  const handleDataSortingAndFiltering = useCallback(
    (data: Country[]) =>
      data
        .filter((item) => item.name.common.toLowerCase().includes(searchTerm))
        .filter((item) => item.region.includes(filter))
        .sort((a, b) => {
          if (!sortOrder) return 0;
          if (sortBy === 'population') {
            return sortOrder === 'asc'
              ? a.population - b.population
              : b.population - a.population;
          }
          if (sortBy === 'name') {
            return sortOrder === 'asc'
              ? a.name.common.localeCompare(b.name.common)
              : b.name.common.localeCompare(a.name.common);
          }
          return 0;
        }),
    [searchTerm, filter, sortOrder, sortBy],
  );

  const handleOnClick = (
    e: React.SyntheticEvent,
    countries: CountriesLocalStorage,
    setCountry: (value: string) => void,
  ) => {
    const target = e.target as HTMLElement;
    if (!target.closest('[data-view-item]')) return;
    const viewItem = target.closest('[data-view-item]') as HTMLElement;

    const countryName = viewItem.dataset.viewItem ?? '';
    if (!countries[countryName]) {
      setCountry(countryName);
    }
  };

  const memoizedData = useMemo(() => {
    return handleDataSortingAndFiltering(addVisitedCountry);
  }, [addVisitedCountry, handleDataSortingAndFiltering]);

  return {
    sortedAndFilteredData: memoizedData,
    searchTerm,
    setSearchTerm,
    filter,
    setFilterOption,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    handleOnClick,
  };
};
