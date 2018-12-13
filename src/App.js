import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import './App.css';
import { propertyListPath } from './routes';
import PropertyListPage from './container/property-list-page';

function App() {
  return (
    <Switch>
      <Route path={propertyListPath} component={PropertyListPage} />
      <Redirect from="/" to={propertyListPath} />
    </Switch>
  );
}

export default withRouter(connect()(App));
