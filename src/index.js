import React from 'react';
import { render } from 'react-dom';

import 'normalize.css/normalize.css';
import 'bootstrap/dist/css/bootstrap.css';
import './index.scss';

import App from './App';

import registerServiceWorker from './registerServiceWorker';

render(<App />, document.getElementById('root'));

registerServiceWorker();
