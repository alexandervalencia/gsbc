import React, { Component } from 'react';

import Home from './views/Home/Home';
import BookPage from './views/BookPage/BookPage';

import { SiteFooter, SiteHeader } from 'components';
import './App.scss';

import { Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SiteHeader />

        <main className="main">
          <Switch>
            <Route exact path="/books/:id" component={BookPage} />
            <Route path="/" component={Home} />
          </Switch>
        </main>

        <SiteFooter />
      </div>
    );
  }
}

export default App;
