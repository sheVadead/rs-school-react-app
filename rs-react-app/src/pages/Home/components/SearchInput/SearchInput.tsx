import { ChangeEvent, Component, FormEvent } from 'react';
import styles from './SearchInput.module.css';
import {
  starWarsApiClient,
  StarWarsPerson,
} from '../../../../services/starWarsApiClient';

type SearchInputProps = {
  setItems: (items: StarWarsPerson[]) => void;
  setLoader: (isLoading: boolean) => void;
  setError: (isError: boolean) => void;
};

type State = {
  inputValue: string;
};

export class SearchInput extends Component<SearchInputProps, State> {
  state: State = {
    inputValue: localStorage.getItem('lastSearchTerm') || '',
  };

  constructor(props: SearchInputProps) {
    super(props);
  }

  handleOnInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    this.setState({ inputValue: value });
  };

  async componentDidMount(): Promise<void> {
    this.setFetchedItemsToState();
  }

  handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.setFetchedItemsToState();
  };

  setFetchedItemsToState = async () => {
    try {
      this.startLoading();
      const response = await this.fetchItems();
      this.updateStateWithFetchedItems(response);
    } catch (error) {
      this.handleError(error);
    } finally {
      this.stopLoading();
    }
  };

  startLoading = () => {
    this.props.setLoader(true);
  };

  stopLoading = () => {
    this.props.setLoader(false);
  };

  fetchItems = async () => {
    return await starWarsApiClient.search(this.state.inputValue);
  };

  updateStateWithFetchedItems = (response: {
    items: StarWarsPerson[];
    isLoading: boolean;
    isError?: boolean;
  }) => {
    this.props.setItems(response.items);
    if (response.isError) {
      this.props.setError(response.isError);
    }
  };

  handleError = (error: unknown) => {
    console.error('Error fetching items:', error);
    this.props.setError(true);
  };

  render() {
    return (
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
    );
  }
}
