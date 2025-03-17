import styles from './Sort.module.css';

type SortProps = {
  params: {
    setSortOrder: React.Dispatch<React.SetStateAction<string>>;
    setSortBy: React.Dispatch<React.SetStateAction<string>>;
    sortBy: string;
  };
};

export const Sort: React.FC<SortProps> = ({ params }: SortProps) => {
  const { setSortBy, setSortOrder } = params;
  return (
    <div className={styles.sortWrapper}>
      <div className={styles.sortOrderWrapper}>
        <label htmlFor="sort-order">Sort Order:</label>
        <select
          disabled={!params.sortBy}
          onChange={(e) => setSortOrder(e.target.value)}
          className={styles.orderSelect}
          name="sort-order"
          id="sort-order"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div className={styles.sortByWrapper}>
        <label htmlFor="sort">Sort Order:</label>
        <select
          onChange={(e) => setSortBy(e.target.value)}
          className={styles.sortBySelect}
          name="sort"
          id="sort"
        >
          <option defaultChecked value=""></option>
          <option value="name">By Name</option>
          <option value="population">By Population</option>
        </select>
      </div>
    </div>
  );
};
