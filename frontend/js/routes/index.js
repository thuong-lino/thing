import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Auth/Login';
import SignUp from '../pages/Auth/SignUp';
import Hoc from '../Hoc';
const BaseRouter = () => (
  <Hoc>
    <Route exact path="/" component={Home} />
    <Route path="/login/" component={Login} />
    <Route path="/signup/" component={SignUp} />
  </Hoc>
);

export default BaseRouter;
