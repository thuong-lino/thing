// import pages
import * as Sentry from '@sentry/browser';
import React from 'react';
import ReactDOM from 'react-dom';

import '../sass/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

Sentry.init({
  dsn: window.SENTRY_DSN,
  release: window.COMMIT_SHA,
});

ReactDOM.render(<App />, document.getElementById('react-app'));
