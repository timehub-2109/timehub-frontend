import {Redirect, Route, Switch } from 'react-router-dom';
import Nav from '../common/AuthNav';
import Auth from './Auth';
import Logout from '../Logout';
import Dashboard from '../Dashboard';
import LinkedAccounts from '../linked-accounts/LinkedAccounts';
import NotFound from '../common/NotFound';
import React from 'react';

class AuthenticatedRouter extends React.Component {
  constructor(props) {
    super(props);
    this.refreshFlag = true;
    this.getRefreshFlag = this.getRefreshFlag.bind(this);
    this.setRefreshFlag = this.setRefreshFlag.bind(this);
    this.unsetRefreshFlag = this.unsetRefreshFlag.bind(this);
  }

  getRefreshFlag() {
    return this.refreshFlag;
  }

  setRefreshFlag() {
    this.refreshFlag = true;
  }

  unsetRefreshFlag() {
    this.refreshFlag = false;
  }

  render() {
    if (Auth.isAuthenticated()) {
      return (
        <div className="flex flex-col items-center">
          <Nav />
          <Switch>
            <Route exact path="/dashboard">
              <Dashboard getRefreshFlag={this.getRefreshFlag} unsetRefreshFlag={this.unsetRefreshFlag} setRefreshFlag={this.setRefreshFlag}/>
            </Route>
            <Route path="/linked-accounts">
              <LinkedAccounts handleRefreshFlag={this.setRefreshFlag}/>
            </Route>
            <Route path="/logout">
              <Logout />
            </Route>
            <Route component={NotFound} />
          </Switch>
        </div>
      );
    } else {
      return <Redirect to={{ path: "/", state: { from: this.props.location }}} />;
    }
  }
}

export default AuthenticatedRouter;