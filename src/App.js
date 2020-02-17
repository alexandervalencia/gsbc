import React, { Component } from 'react';

import Home from './views/Home/Home';
import AddBook from './views/AddBook/AddBook';
import BookPage from './views/BookPage/BookPage';
import Login from './views/Login/Login';
import ResetPassword from './views/ResetPassword/ResetPassword';

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
            <Route exact path="/login" component={Login} />
            <Route exact path="/reset_password" component={ResetPassword} />
            <Route path={['/add', '/new']} component={AddBook} />
            <Route path="/" component={Home} />
          </Switch>
        </main>

        <SiteFooter />
      </div>
    );
  }
}

export default App;
