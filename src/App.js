import React, { Component } from 'react';

import Home from './views/Home';
import { SiteFooter, SiteHeader } from 'components';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SiteHeader />
        <Home />
        <SiteFooter />
      </div>
    );
  }
}

export default App;
