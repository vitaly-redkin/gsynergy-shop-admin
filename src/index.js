/**
 * Root component.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/main/Main';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);

registerServiceWorker();
