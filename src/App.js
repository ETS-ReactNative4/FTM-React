import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './home/Home';
import Recipe from './recipe/Recipe';
import Login from './login/Login';
import Logs from './logs/Logs';
import AddLog from './addlog/AddLog';
import Profile from './profile/Profile';
import Signup from './signup/Signup';
import { graphql } from 'react-apollo';
import { getToken } from './graphql/queries';
import CallbackReceiver from './callback/CallbackReceiver';
import SignOut from './signOut/SignOut';

class App extends Component {
  render() {
    const { token } = this.props;
    return (
      <div>
        <Route exact path="/" component={() => <Home token={token} />} />
        <Route exact path="/recipe" component={Recipe} />
        <Route exact path="/recipe/:title" component={Recipe} />
        <Route exact path="/recipe/:author/:title" component={Recipe} />
        <Route exact path="/recipe/:id" component={Recipe} />
        <Route exact path="/login" component={Login} />
        <Route path="/logs" component={Logs} />
        <Route path="/addlog" component={AddLog} />
        <Route path="/profile" component={Profile} />
        <Route path="/signup" component={Signup} />
        <Route path="/signout" component={SignOut} />
        <Route
          path="/auth/google/callback"
          component={() => {
            return <CallbackReceiver token={token} source={'google'} />;
          }}
        />
        <Route
          path="/auth/facebook/callback"
          component={() => {
            return <CallbackReceiver token={token} source={'facebook'} />;
          }}
        />
      </div>
    );
  }
}

export default graphql(getToken, {
  props: ({ data: { token } }) => ({ token })
})(App);
