import React from 'react';
import { render } from 'react-dom';

import 'normalize.css/normalize.css';
import 'bootstrap/dist/css/bootstrap.css';
import './index.scss';

import App from './App';

import registerServiceWorker from './registerServiceWorker';
import UserProvider from './providers/UserProvider';
import BooksProvider from './providers/BooksProvider';
import MembersProvider from './providers/MembersProvider';

const appRoot = document.getElementById('root');
render(
  <UserProvider>
    <BooksProvider>
      <MembersProvider>
        <App />
      </MembersProvider>
    </BooksProvider>
  </UserProvider>,
  appRoot
);

registerServiceWorker();
