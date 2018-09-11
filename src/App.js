import React, { Component } from 'react';

import Bookcase from './containers/Bookcase/Bookcase';
import { SiteFooter, SiteHeader } from 'components';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SiteHeader />
        <Bookcase />
        <SiteFooter />
      </div>
    );
  }
}

export default App;
