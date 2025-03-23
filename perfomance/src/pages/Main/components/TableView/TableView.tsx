import { fetchCountries } from '../../../../api/countries/countries.api';
import { useFetch } from '../../../../hooks/useFetch';
import { Country } from '../../../../types/country';
import { ViewItem } from '../ViewItem/ViewItem';
import styles from './TableView.module.css';
import { useLogic } from './hooks/useLogic';
import { Controls } from '../Controls/Controls';
import { useLocalStorage } from './hooks/useLocalStorage';
import React, { useCallback, useMemo } from 'react';

const TableView = () => {
  const { data, isLoading } = useFetch<Country[]>(fetchCountries);
  const [visitedCountries, setCountry] = useLocalStorage();

  const regions = useMemo(() => {
    return data.reduce((acc, item) => {
      acc.add(item.region);
      return acc;
    }, new Set());
  }, [data]);

  const {
    sortedAndFilteredData,
    setSearchTerm,
    setFilterOption,
    sortBy,
    setSortBy,
    setSortOrder,
    handleOnClick,
  } = useLogic(data, visitedCountries);

  const memoizedHandleOnClick = useCallback(
    (e: React.SyntheticEvent) => handleOnClick(e, visitedCountries, setCountry),
    [handleOnClick, visitedCountries, setCountry],
  );

  return (
    <div
      className={styles.tableViewWrapper}
      onClick={(e: React.SyntheticEvent) => memoizedHandleOnClick(e)}
    >
      <div>
        {!isLoading && (
          <Controls
            params={{
              setSearchTerm,
              setFilterOption,
              setSortBy,
              setSortOrder,
              sortBy,
              regions: Array.from(regions) as string[],
            }}
          />
        )}
      </div>
      <div className={styles.viewHeader}>
        <h3>Name</h3>
        <h3>Population</h3>
        <h3>Region</h3>
        <h3>Flag</h3>
      </div>
      {!isLoading &&
        sortedAndFilteredData.map(
          (
            { flags: { png }, name: { common }, population, region, visited },
            index: number,
          ) => (
            <ViewItem
              key={index}
              country={{
                flagImageUrl: png,
                name: common,
                population,
                region,
                visited,
              }}
            />
          ),
        )}
    </div>
  );
};

const memoizedViewItem = React.memo(TableView);
export { memoizedViewItem as TableView };
