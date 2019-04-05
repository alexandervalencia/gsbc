import React, { Component } from 'react';

import Bookcase from './containers/Bookcase/Bookcase';
import { SiteFooter, SiteHeader } from 'components';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        Hello
        {/* <SiteHeader />
        <Bookcase />
        <SiteFooter /> */}
      </div>
    );
  }
}

export default App;
