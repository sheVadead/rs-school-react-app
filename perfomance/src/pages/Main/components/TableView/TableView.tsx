import { useState } from 'react';
import { fetchCountries } from '../../../../api/countries/countries.api';
import { useFetch } from '../../../../hooks/useFetch';
import { Country } from '../../../../types/country';
import { Search } from '../Controls/components/Search/Search';
import { ViewItem } from '../ViewItem/ViewItem';
import styles from './TableView.module.css';
import { Filter } from '../Controls/components/Filter/Filter';
import { Sort } from '../Controls/components/Sort/Sort';
export const TableView = () => {
  const { data, isLoading } = useFetch<Country[]>(fetchCountries);

  const regions = data.reduce((acc, item) => {
    acc.add(item.region);
    return acc;
  }, new Set());

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filter, setFilterOption] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');

  return (
    <div className={styles.tableViewWrapper}>
      <Search params={{ setSearchTerm }} />
      {!isLoading && (
        <div>
          <Filter
            params={{
              setFilterOption,
              options: Array.from(regions) as string[],
            }}
          />
          <Sort params={{ setSortBy, setSortOrder, sortBy }} />
        </div>
      )}
      <div className={styles.viewHeader}>
        <h3>Name</h3>
        <h3>Population</h3>
        <h3>Region</h3>
        <h3>Flag</h3>
      </div>
      {!isLoading &&
        data
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
          })
          .map(
            (
              { flags: { png }, name: { common }, population, region },
              index: number,
            ) => (
              <ViewItem
                key={index}
                country={{
                  flagImageUrl: png,
                  name: common,
                  population,
                  region,
                }}
              />
            ),
          )}
    </div>
  );
};
