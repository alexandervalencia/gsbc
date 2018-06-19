import React, { Component } from 'react';

import Bookcase from './containers/Bookcase/Bookcase'
import { Footer, Header } from 'components'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Bookcase />
        <Footer />
      </div>
    );
  }
}

export default App;
