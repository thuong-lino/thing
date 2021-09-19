import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Auth/Login';
import SignUp from '../pages/Auth/SignUp';
import Assignments from '../pages/Assignment/Assignments';
import Hoc from '../Hoc';
const BaseRouter = () => (
  <Hoc>
    <Route exact path="/" component={Home} />
    <Route path="/login/" component={Login} />
    <Route path="/signup/" component={SignUp} />
    <Route exact path="/assignments/" component={Assignments} />
  </Hoc>
);

export default BaseRouter;
