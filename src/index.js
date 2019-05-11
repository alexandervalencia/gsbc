import React from 'react';
import { render } from 'react-dom';

import 'normalize.css/normalize.css';
import 'bootstrap/dist/css/bootstrap.css';
import './index.scss';

import App from './App';

import registerServiceWorker from './registerServiceWorker';
import UserProvider from './providers/UserProvider';
import BooksProvider from './providers/BooksProvider';
import UsersProvider from './providers/UsersProvider';

import { BrowserRouter as Router } from 'react-router-dom';

const appRoot = document.getElementById('root');

render(
  <Router>
    <UserProvider>
      <BooksProvider>
        <UsersProvider>
          <App />
        </UsersProvider>
      </BooksProvider>
    </UserProvider>
  </Router>,
  appRoot
);

registerServiceWorker();
