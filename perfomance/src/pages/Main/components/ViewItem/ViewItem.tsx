import React from 'react';
import styles from './ViewItem.module.css';

type ViewItemProps = {
  country: {
    population: number;
    region: string;
    flagImageUrl: string;
    name: string;
    visited?: boolean;
  };
};

const ViewItem: React.FC<ViewItemProps> = ({ country }: ViewItemProps) => {
  const { population, region, flagImageUrl, name, visited } = country;

  const classNames = `${styles.viewItemWrapper} ${visited ? styles.visited : ''}`;
  return (
    <div className={classNames} data-view-item={name}>
      <div className={styles.viewItem}>
        <div className={styles.nameWrapper}>
          <span>{name}</span>
        </div>
        <div className={styles.populationWrapper}>
          <span>{population}</span>
        </div>
        <span>{region}</span>
        <img
          className={styles.flagImage}
          src={flagImageUrl}
          width={100}
          height={60}
          alt={name}
        />
      </div>
    </div>
  );
};

const memoizedViewItem = React.memo(ViewItem);
export { memoizedViewItem as ViewItem };
