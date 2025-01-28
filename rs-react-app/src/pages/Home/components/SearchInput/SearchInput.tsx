import { ChangeEvent, Component } from 'react';
import styles from './SearchInput.module.css';

type SearchInputProps = object;

export class SearchInput extends Component {
  state = {
    inputValue: '',
  };

  constructor(props: SearchInputProps) {
    super(props);
    this.handleOnInputChange = this.handleOnInputChange.bind(this);
  }

  handleOnInputChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    this.setState({ inputValue: value });
  }

  render() {
    return (
      <>
        <div className={styles.container}>
          <input
            onChange={this.handleOnInputChange}
            className={styles.searchInput}
            type="search"
            name=""
            id=""
          />
        </div>
      </>
    );
  }
}
