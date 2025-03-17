import { fetchCountries } from '../../../../api/countries/countries.api';
import { useFetch } from '../../../../hooks/useFetch';
import { Country } from '../../../../types/country';
import { ViewItem } from '../ViewItem/ViewItem';
import styles from './TableView.module.css';
import { useLogic } from './hooks/useLogic';
import { Controls } from '../Controls/Controls';
export const TableView = () => {
  const { data, isLoading } = useFetch<Country[]>(fetchCountries);

  const regions = data.reduce((acc, item) => {
    acc.add(item.region);
    return acc;
  }, new Set());

  const {
    sortedAndFilteredData,
    setSearchTerm,
    setFilterOption,
    sortBy,
    setSortBy,
    setSortOrder,
  } = useLogic(data);

  return (
    <div className={styles.tableViewWrapper}>
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
