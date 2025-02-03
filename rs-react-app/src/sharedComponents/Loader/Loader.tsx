import { Component } from 'react';
import styles from './Loader.module.css'; // Make sure to create this CSS file for styling

export class Loader extends Component {
  render() {
    return (
      <div className={styles['loader-container']}>
        <div className={styles.loader}></div>
      </div>
    );
  }
}
