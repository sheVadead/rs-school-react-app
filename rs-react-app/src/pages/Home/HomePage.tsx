import { Component } from 'react';
import { SearchInput } from './components/SearchInput/SearchInput';
import { ItemList } from './components/ItemList/ItemList';
import './HomePage.module.css';
import { StarWarsPerson } from '../../services/starWarsApiClient';

type State = {
  items: StarWarsPerson[];
};
export class HomePage extends Component {
  state: State = {
    items: [],
  };

  setItems = (items: StarWarsPerson[]) => {
    this.setState({ items });
  };

  render() {
    return (
      <>
        <main>
          <SearchInput setItems={this.setItems} />
          <ItemList items={this.state.items} />
        </main>
      </>
    );
  }
}
