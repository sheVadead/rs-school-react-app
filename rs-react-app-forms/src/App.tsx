import { Link, Route, Routes } from 'react-router';
import { ControlledForm } from './pages/controlledForm/ControlledForm';

const App = () => {
  return (
    <>
      <h1>React Router</h1>

      <Navigation />
      <Routes>
        <Route path="controlledForm" element={<ControlledForm />} />
        {/* <Route path="uncontrolledForm" element={<Users />} /> */}
      </Routes>
    </>
  );
};

const Navigation = () => {
  return (
    <nav
      style={{
        borderBottom: 'solid 1px',
        paddingBottom: '1rem',
      }}
    >
      <Link to="/home">Home</Link>
      <Link to="/users">Users</Link>
    </nav>
  );
};

export default App;
