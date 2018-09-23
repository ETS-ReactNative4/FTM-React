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
import { getJwt } from './graphql/queries';
import CallbackReceiver from './callback/CallbackReceiver';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/recipe" component={Recipe} />
        <Route exact path="/recipe/:title" component={Recipe} />
        <Route exact path="/recipe/:author/:title" component={Recipe} />
        <Route exact path="/recipe/:id" component={Recipe} />
        <Route path="/login" component={Login} />
        <Route path="/logs" component={Logs} />
        <Route path="/addlog" component={AddLog} />
        <Route path="/profile" component={Profile} />
        <Route path="/signup" component={Signup} />
        <Route
          path="/auth/google/callback"
          component={() => {
            return <CallbackReceiver source={'google'} />;
          }}
        />
        <Route
          path="/auth/facebook/callback"
          component={() => {
            return <CallbackReceiver source={'facebook'} />;
          }}
        />
      </div>
    );
  }
}

export default graphql(getJwt, {
  props: ({ data: { jwt } }) => ({ jwt })
})(App);
