import { Link, useLocation } from 'react-router-dom';
import { RoutesEnum } from '../../constants';
import styles from './Navigation.module.css';

export const Navigation = () => {
  const location = useLocation();
  const { pathname } = location;

  const renderLinks = () => {
    switch (pathname) {
      case RoutesEnum.ControlledForm:
        return (
          <>
            <Link to="/">Main</Link>
            <Link to="/uncontrolledForm">Uncontrolled Form</Link>
          </>
        );
      case RoutesEnum.UncontrolledForm:
        return (
          <>
            <Link to="/">Main</Link>
            <Link to="/controlledForm">Controlled Form</Link>
          </>
        );
      default:
        return (
          <>
            <Link to="/controlledForm">Controlled Form</Link>
            <Link to="/uncontrolledForm">Uncontrolled Form</Link>
          </>
        );
    }
  };

  return (
    <nav>
      <h1>Navigation</h1>
      <div className={styles.navigationWrapper}>{renderLinks()}</div>
    </nav>
  );
};
