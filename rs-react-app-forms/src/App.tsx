import { Route, Routes } from 'react-router-dom';
import { ControlledForm } from './pages/ControlledForm/ControlledForm';
import { MainPage } from './pages/Main/Main';
import { UnControlledForm } from './pages/UncontrolledForm/UncontrolledForm';
import { Navigation } from './sharedComponents/Navigation/Navigation';
import './App.css';

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

export default App;
