import { Component } from 'react';
import { SearchInput } from './components/SearchInput/SearchInput';
import { ItemList } from './components/ItemList/ItemList';
import './HomePage.module.css';

export class HomePage extends Component {
  render() {
    return (
      <>
        <main>
          <SearchInput />
          <ItemList />
        </main>
      </>
    );
  }
}
