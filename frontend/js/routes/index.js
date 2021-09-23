import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Auth/Login';
import SignUp from '../pages/Auth/SignUp';
import AssignmentList from '../pages/Assignments/AssignmentList';
import AssignmentDetail from '../pages/Assignments/AssignmentDetail';
import Hoc from '../Hoc';
const BaseRouter = () => (
  <Hoc>
    <Route exact path="/" component={Home} />
    <Route path="/login/" component={Login} />
    <Route path="/signup/" component={SignUp} />
    <Route exact path="/assignments/" component={AssignmentList} />
    <Route path="/assignments/:id/" component={AssignmentDetail} />
  </Hoc>
);

export default BaseRouter;
