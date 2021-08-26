import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthenticatedRouter from './auth/AuthenticatedRouter';
import Landing from './Landing';
import WriteUp from './Writeup';
import Login from './Login';
import SignUp from './SignUp';
import NotFound from './common/NotFound';
import ScrollToTop from './common/ScrollToTop';
import auth from './auth/Auth';

class App extends React.Component {
  componentDidMount() {
    auth.refreshDB();
  }

  render() {
    return (
        <div className="h-screen font-gray-700">
          <Router>
            <ScrollToTop>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route path="/writeup" component={WriteUp} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
              <Route render={(props) => <AuthenticatedRouter {...props} />} />
              <Route component={NotFound} />
            </Switch>
            </ScrollToTop>
          </Router>
        </div>
    );
  }

}

export default App;
