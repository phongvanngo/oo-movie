import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Detail from '../pages/detail/Detail';
import LoginPage from 'pages/login/Login';
import Plan from 'pages/plan/Plan';

const Routes = () => {
  return (
    <Switch>
      <Route path="/sign-in" component={LoginPage} />
      <Route path="/plan" component={Plan} />
      <Route path="/:category/search/:keyword" component={Catalog} />
      <Route path="/:category/:id" component={Detail} />
      <Route path="/:category" component={Catalog} />
      <Route path="/" exact component={Home} />
    </Switch>
  );
};

export default Routes;