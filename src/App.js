import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import './App.css';
import { propertyListPath } from './routes';
import PropertyList from './container/property-list';

function App() {
  return (
    <Switch>
      <Route path={propertyListPath} component={PropertyList} />
      <Redirect from="/" to={propertyListPath} />
    </Switch>
  );
}

export default withRouter(connect()(App));
