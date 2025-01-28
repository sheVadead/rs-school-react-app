import { Component } from 'react';
import './assets/styles/App.css';
import { HomePage } from './pages/Home/HomePage';

class App extends Component {
  state = {
    count: 0,
  };

  handleCountChange = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  render() {
    return (
      <>
        <HomePage />
      </>
    );
  }
}

export default App;
