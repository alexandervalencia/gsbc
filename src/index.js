import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import 'normalize.css/normalize.css';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import App from './App';
import authReducer from './store/reducers/auth';
import booksReducer from './store/reducers/books';
import membersReducer from './store/reducers/members';
import ratingsReducer from './store/reducers/ratings';
import registerServiceWorker from './registerServiceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  books: booksReducer,
  members: membersReducer,
  ratings: ratingsReducer,
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
