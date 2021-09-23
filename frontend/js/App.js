import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';

import BaseRouter from './routes/index';
import { ConnectedRouter } from 'connected-react-router';

import Layout from './pages/Layout';
import configureStore, { history } from './store';

import SentryBoundary from './utils/SentryBoundary';

const store = configureStore({});

class App extends React.Component {
  render() {
    return (
      <SentryBoundary>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Layout {...this.props}>
              <BaseRouter />
            </Layout>
          </ConnectedRouter>
        </Provider>
      </SentryBoundary>
    );
  }
}

export default hot(App);
