import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';

import BaseRouter from './routes/index';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './pages/Layout';
import configureStore from './store';
import SentryBoundary from './utils/SentryBoundary';

const store = configureStore({});

class App extends React.Component {
  render() {
    return (
      <SentryBoundary>
        <Provider store={store}>
          <Router>
            <Layout>
              <BaseRouter />
            </Layout>
          </Router>
        </Provider>
      </SentryBoundary>
    );
  }
}

export default hot(App);
