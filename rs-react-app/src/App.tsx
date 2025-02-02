import { Component } from 'react';
import './assets/styles/App.css';
import { HomePage } from './pages/Home/HomePage';
import { ErrorBoundary } from './sharedComponents/ErrorBoundry/ErrorBoundry';

class App extends Component {
  render() {
    return (
      <>
        <ErrorBoundary>
          <HomePage />
        </ErrorBoundary>
      </>
    );
  }
}

export default App;
