import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Compare from './pages/Compare';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/compare" component={Compare}></Route>
    </Switch>
  );
};

export default Routes;
