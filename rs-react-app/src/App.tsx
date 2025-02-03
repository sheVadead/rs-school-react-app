import { Component } from 'react';
import './assets/styles/App.css';
import { HomePage } from './pages/Home/HomePage';
import { ErrorBoundary } from './sharedComponents/ErrorBoundary/ErrorBoundary';

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
