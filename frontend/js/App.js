import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';

import Home from './pages/Home';
import Home2 from './pages/Home2';
import configureStore from './store';
import SentryBoundary from './utils/SentryBoundary';

const store = configureStore({});
const App = () => (
  <SentryBoundary>
    <Provider store={store}>
      <Home />

    </Provider>
  </SentryBoundary>
);

export default hot(App);
