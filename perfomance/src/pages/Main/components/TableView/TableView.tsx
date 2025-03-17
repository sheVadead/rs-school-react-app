import { useState } from 'react';
import { fetchCountries } from '../../../../api/countries/countries.api';
import { useFetch } from '../../../../hooks/useFetch';
import { Country } from '../../../../types/country';
import { Search } from '../Controls/components/Search/Search';
import { ViewItem } from '../ViewItem/ViewItem';
import styles from './TableView.module.css';
export const TableView = () => {
  const { data, isLoading, error } = useFetch<Country[]>(fetchCountries);

  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <div className={styles.tableViewWrapper}>
      <Search params={{ searchTerm, setSearchTerm }} />
      <div className={styles.viewHeader}>
        <h3>Name</h3>
        <h3>Population</h3>
        <h3>Region</h3>
        <h3>Flag</h3>
      </div>
      {!isLoading &&
        data
          .filter((item) => item.name.common.toLowerCase().includes(searchTerm))
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
