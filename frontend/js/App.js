import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';

import BaseRouter from './routes/index';
import { BrowserRouter as Router } from 'react-router-dom';

import Layout from './pages/Layout';
import configureStore from './store';
import SentryBoundary from './utils/SentryBoundary';

const store = configureStore({});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null,
    };
  }

  componentDidMount() {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      this.setState({ loggedInUser });
    }
  }
  render() {
    const { loggedInUser } = this.state;

    return (
      <SentryBoundary>
        <Provider store={store}>
          <Router>
            <Layout loggedInUser={loggedInUser}>
              <BaseRouter />
            </Layout>
          </Router>
        </Provider>
      </SentryBoundary>
    );
  }
}
export default hot(App);
