import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Detail from '../pages/detail/Detail';
import Page404 from './../pages/404/Page404';
import { category } from './../api/tmdbAPI';

const Routes = () => {
  return (
    <Switch>
      <Route path="/:category/:id" component={Detail} />
      <Route path="/:category" exact component={Catalog} />
      <Route path="/" exact component={Home} />
    </Switch>
  );
};

export default Routes;
