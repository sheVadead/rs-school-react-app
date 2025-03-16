import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { ControlledForm } from './pages/ControlledForm/ControlledForm';
import { RoutesEnum } from './constants';
import './App.css';
import { MainPage } from './pages/Main/Main';
import { UnControlledForm } from './pages/UncontrolledForm/UncontrolledForm';

const App = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="controlledForm" element={<ControlledForm />} />
        <Route path="/" element={<MainPage />} />
        <Route path="uncontrolledForm" element={<UnControlledForm />} />
      </Routes>
    </>
  );
};

const Navigation = () => {
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

  return <nav>{renderLinks()}</nav>;
};

export default App;
