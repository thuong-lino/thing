import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Hoc from '../Hoc';
const BaseRouter = () => (
  <Hoc>
    <Route exact path="/" component={Home} />
  </Hoc>
);

export default BaseRouter;
