import { ChangeEvent, Component, FormEvent } from 'react';
import styles from './SearchInput.module.css';
import {
  starWarsApiClient,
  StarWarsPerson,
} from '../../../../services/starWarsApiClient';

type SearchInputProps = { setItems: (items: StarWarsPerson[]) => void };

type State = {
  inputValue: string;
};
export class SearchInput extends Component<SearchInputProps> {
  state: State = {
    inputValue: localStorage.getItem('lastSearchTerm') || '',
  };

  constructor(props: SearchInputProps) {
    super(props);
    this.handleOnInputChange = this.handleOnInputChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnInputChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    this.setState({ inputValue: value });
  }

  async componentDidMount(): Promise<void> {
    const response = await starWarsApiClient.search(this.state.inputValue);
    this.props.setItems(response);
  }

  async handleOnSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const response = await starWarsApiClient.search(this.state.inputValue);

    this.props.setItems(response);
  }

  render() {
    return (
      <>
        <div className={styles.container}>
          <form
            className={styles['form-container']}
            onSubmit={this.handleOnSubmit}
          >
            <input
              onChange={this.handleOnInputChange}
              className={styles.searchInput}
              type="search"
              value={this.state.inputValue}
            />
            <button className={styles['button']} type="submit">
              Submit
            </button>
          </form>
        </div>
      </>
    );
  }
}
