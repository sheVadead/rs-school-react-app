import { useNavigate, useParams } from 'react-router-dom';
import { StarWarsPerson } from '../../../../services/starWarsApiClient';
import style from './Item.module.css';

type ItemProps = {
  item: StarWarsPerson;
};

export const Item = ({ item }: ItemProps) => {
  const navigate = useNavigate();
  const { pageNumber } = useParams<{
    pageNumber: string;
  }>();

  const handleButtonClick = (id: string) => {
    navigate(`/page/${pageNumber || 1}/details/${id}`);
  };

  const id = item.url.split('/').slice(-2)[0];
  return (
    <div
      onClick={() => handleButtonClick(id)}
      className={style.card}
      key={item.name}
      data-test-id={id}
    >
      <h3>{item.name}</h3>
    </div>
  );
};
