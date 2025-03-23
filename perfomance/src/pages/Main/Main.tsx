import { TableView } from './components/TableView/TableView';
import style from './Main.module.css';
export const MainPage = () => {
  return (
    <div className={style.mainWrapper}>
      <h1>Countries</h1>
      <TableView />
    </div>
  );
};
