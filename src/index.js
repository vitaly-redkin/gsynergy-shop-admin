/**
 * Root component.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactGA from 'react-ga';
import Main from './components/main/Main';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const gaTrackingId = process.env.REACT_APP_GA_TRACKING_ID;
ReactGA.initialize(gaTrackingId);
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);

registerServiceWorker();
