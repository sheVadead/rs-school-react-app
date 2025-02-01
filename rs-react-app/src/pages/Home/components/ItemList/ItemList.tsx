import { Component } from 'react';
import { StarWarsPerson } from '../../../../services/starWarsApiClient';
import style from './ItemList.module.css';
type itemListProps = {
  items: StarWarsPerson[];
};

export class ItemList extends Component<itemListProps> {
  render() {
    console.log('item list', this.props.items);
    return (
      <div className={style.container}>
        {this.props.items.map((item) => (
          <div className={style.card} key={item.name}>
            <h3>{item.name}</h3>
            <div className={style.cardContainer}>
              <div className={style.cardColumn}>
                <span>Height: {item.height}</span>
                <span>Mass: {item.mass}</span>
                <span>Hair color: {item.hair_color}</span>
              </div>
              <div className={style.cardColumn}>
                <span>Eye color: {item.eye_color}</span>
                <span>Birth year: {item.birth_year}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
