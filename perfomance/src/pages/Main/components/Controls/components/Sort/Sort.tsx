import React, { useCallback } from 'react';
import { SortBy, SortOrder } from '../../../TableView/hooks/useLogic';
import styles from './Sort.module.css';

type SortProps = {
  params: {
    setSortOrder: React.Dispatch<React.SetStateAction<SortOrder>>;
    setSortBy: React.Dispatch<React.SetStateAction<SortBy>>;
    sortBy: SortBy;
  };
};

const Sort: React.FC<SortProps> = ({ params }: SortProps) => {
  const { setSortBy, setSortOrder } = params;

  const handleSortOrderChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSortOrder(e.target.value as SortOrder);
    },
    [setSortOrder],
  );

  const handleSortByChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const target = e.target.value as SortBy;

      if (target === SortBy.DEFAULT) {
        setSortOrder(SortOrder.DEFAULT);
        setSortBy(SortBy.DEFAULT);
        return;
      }

      setSortBy(target);
    },
    [setSortBy, setSortOrder],
  );

  return (
    <div className={styles.sortWrapper}>
      <div className={styles.sortOrderWrapper}>
        <label htmlFor="sort-order">Sort Order:</label>
        <select
          disabled={!params.sortBy}
          onChange={handleSortOrderChange}
          className={styles.orderSelect}
          name="sort-order"
          id="sort-order"
        >
          <option defaultChecked value="">
            Default
          </option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div className={styles.sortByWrapper}>
        <label htmlFor="sort">Sort By:</label>
        <select
          onChange={handleSortByChange}
          className={styles.sortBySelect}
          name="sort"
          id="sort"
        >
          <option defaultChecked value="">
            Default
          </option>
          <option value="name">By Name</option>
          <option value="population">By Population</option>
        </select>
      </div>
    </div>
  );
};

const memoizedViewItem = React.memo(Sort);
export { memoizedViewItem as Sort };
