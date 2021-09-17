import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Auth/Login';
import Hoc from '../Hoc';
const BaseRouter = () => (
  <Hoc>
    <Route exact path="/" component={Home} />
    <Route path="/login/" component={Login} />
  </Hoc>
);

export default BaseRouter;
