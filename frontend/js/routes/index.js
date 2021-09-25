import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Auth/Login';
import SignUp from '../pages/Auth/SignUp';
import AssignmentList from '../pages/Assignments/AssignmentList';
import AssignmentDetail from '../pages/Assignments/AssignmentDetail';
import AssignmentCreate from '../pages/Assignments/AssignmentCreate';

import Hoc from '../Hoc';
const BaseRouter = () => (
  <Hoc>
    <Route exact path="/" component={Home} />
    <Route path="/login/" component={Login} />
    <Route path="/signup/" component={SignUp} />
    <Switch>
      <Route exact path="/assignments/" component={AssignmentList} />
      <Route path="/assignments/create" component={AssignmentCreate} />
      <Route path="/assignments/:id" component={AssignmentDetail} />
    </Switch>
  </Hoc>
);

export default BaseRouter;
