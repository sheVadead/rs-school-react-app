import { Component } from 'react';
import { SearchInput } from './components/SearchInput/SearchInput';
import { ItemList } from './components/ItemList/ItemList';
import './HomePage.module.css';
import { StarWarsPerson } from '../../services/starWarsApiClient';
import { Loader } from '../../sharedComponents/Loader/Loader';

export type HomePageState = {
  items: StarWarsPerson[];
  isLoading: boolean;
  isError: boolean;
  isErrorBoundryError: boolean;
};
export class HomePage extends Component {
  state: HomePageState = {
    items: [],
    isLoading: false,
    isError: false,
    isErrorBoundryError: false,
  };

  setIsloading = (isLoading: boolean) => {
    this.setState((prevState: HomePageState) => ({ ...prevState, isLoading }));
  };

  setItems = (items: StarWarsPerson[]) => {
    this.setState((prevState: HomePageState) => ({ ...prevState, items }));
  };

  setError = (isError: boolean) => {
    this.setState((prevState: HomePageState) => ({ ...prevState, isError }));
  };

  triggerError = () => {
    this.setState(() => {
      throw new Error('Test error for ErrorBoundary');
    });
  };

  render() {
    console.log('husky');
    return (
      <>
        <main>
          <SearchInput
            setItems={this.setItems}
            setLoader={this.setIsloading}
            setError={this.setError}
          />
          <button onClick={this.triggerError}>
            Trigger Error Boundry error
          </button>
          {this.state.isLoading ? (
            <Loader />
          ) : (
            <ItemList items={this.state.items} isError={this.state.isError} />
          )}
        </main>
      </>
    );
  }
}
