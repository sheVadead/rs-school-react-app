import React from 'react';
import styles from './Loader.module.css';

export const Loader: React.FC = () => {
  return (
    <div data-testid="loader" className={styles['loader-container']}>
      <div className={styles.loader}></div>
    </div>
  );
};
