import React, { useCallback } from 'react';
import styles from './Filter.module.css';

type FilterProps = {
  params: {
    setFilterOption: React.Dispatch<React.SetStateAction<string>>;
    options: string[];
  };
};

const Filter: React.FC<FilterProps> = ({ params }: FilterProps) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      params.setFilterOption(e.target.value);
    },
    [params],
  );

  return (
    <div className={styles.filterWrapper}>
      <label htmlFor="filter">Filter by Region:</label>
      <select
        className={styles.filterSelect}
        id="filter"
        onChange={handleChange}
      >
        <option defaultChecked key={'All'} value={''}>
          All
        </option>
        {params.options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

const memoizedViewItem = React.memo(Filter);
export { memoizedViewItem as Filter };
