import { useState } from 'react';
import { Country } from '../../../../../types/country';

export enum SortOrder {
  DEFAULT = '',
  ASC = 'asc',
  DESC = 'desc',
}

export const useLogic = (data: Country[]) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filter, setFilterOption] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.DEFAULT);

  const handleDataSortingAndFiltering = (data: Country[]) => {
    return data
      .filter((item) => item.name.common.toLowerCase().includes(searchTerm))
      .filter((item) => item.region.includes(filter))
      .sort((a, b) => {
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
      });
  };

  return {
    sortedAndFilteredData: handleDataSortingAndFiltering(data),
    searchTerm,
    setSearchTerm,
    filter,
    setFilterOption,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
  };
};
