import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import './App.css';
import { propertyListPath, propertyPath } from './routes';
import PropertyListPage from './container/property-list-page';
import PropertyPage from './container/property-page';

function App() {
  return (
    <Switch>
      <Route path={propertyListPath} component={PropertyListPage} />
      <Route path={propertyPath} component={PropertyPage} />
      <Redirect from="/" to={propertyListPath} />
    </Switch>
  );
}

export default withRouter(App);
