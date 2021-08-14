import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthenticatedRouter from './auth/AuthenticatedRouter';
import WriteUp from './Writeup';
import Login from './Login';
import SignUp from './SignUp';
import NotFound from './common/NotFound';

class App extends React.Component {  
  render() {
    return (
        <div className="h-screen font-gray-700">
          <Router>
            <Switch>
              <Route exact path="/" component={WriteUp} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
              <Route render={(props) => <AuthenticatedRouter {...props} />} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </div>
    );
  }

}

export default App;
