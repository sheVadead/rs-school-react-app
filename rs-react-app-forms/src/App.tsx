import { Link, Route, Routes } from 'react-router';
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
  const { pathname } = window.location;
  const base = [
    RoutesEnum.ControlledForm,
    RoutesEnum.UncontrolledForm,
  ].includes(pathname as RoutesEnum);
  console.log(base);
  return (
    <nav>
      <Link to="/controlledForm">Controlled Form</Link>
      <Link to="/uncontrolledForm">Uncontrolled Form</Link>
    </nav>
  );
};

export default App;
