import { Component } from 'react';
import { StarWarsPerson } from '../../../../services/starWarsApiClient';
import style from './ItemList.module.css';
type itemListProps = {
  items: StarWarsPerson[];
  isError: boolean;
};

export class ItemList extends Component<itemListProps> {
  render() {
    return (
      <div
        className={
          this.props.isError ? style['error-container'] : style.container
        }
      >
        {this.props.isError ? (
          <h3>Something went wrong. Try again later</h3>
        ) : (
          this.props.items.map((item) => (
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
                  <span>Gender: {item.gender}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    );
  }
}
