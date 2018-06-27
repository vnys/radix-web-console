import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import GlobalNav from '../global-nav';
import PageAbout from '../page-about';
import PageApplications from '../page-applications';
import PageCreateApplication from '../page-create-application';
import routes from '../../routes';

import './style.css';

export const App = () => (
  <div className="app">
    <GlobalNav />
    <main className="o-layout-container">
      <Route path={routes.about} component={PageAbout} />
      <Route path={routes.apps} component={PageApplications} exact />
      <Route path={routes.appCreate} component={PageCreateApplication} />

      <Route
        exact
        path={routes.home}
        render={() => <Redirect to={routes.apps} />}
      />
    </main>
  </div>
);

export default App;
