import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import AppBar from './home/AppBar/AppBar';
import Home from './home/Home';
import Recipe from './recipe/Recipe';
import Login from './login/Login';
import Logs from './logs/Logs';
import AddLog from './addlog/AddLog';
import Profile from './profile/Profile';
import Signup from './signup/Signup';
import Auth from './auth/Auth';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { Provider as JwtProvider } from './context/Jwt';
import Callback from './callback/Callback';
import './App.css';

export const client = new ApolloClient({
  uri: 'https://api.foodtomake.com/graphql'
});

const auth = new Auth();

const theme = createMuiTheme({
  palette: {
    primary: blue
  }
});
class App extends Component {
  state = {
    setJwt: jwt => this.setState({ jwt })
  };

  

  render() {
    console.log(this.state.jwt);
    return (
      <div className="app-container">
        <ApolloProvider client={client}>
          <BrowserRouter>
            <MuiThemeProvider theme={theme}>
              <JwtProvider value={this.state}>
                <div className="app-bar">
                  <AppBar isLoggedIn={this.state.jwt} />
                </div>
                <div className="content-area">
                  <Route exact path="/" component={Home} />
                  <Route exact path="/recipe" component={Recipe} />
                  <Route exact path="/recipe/:title" component={Recipe} />
                  <Route
                    exact
                    path="/recipe/:author/:title"
                    component={Recipe}
                  />
                  <Route exact path="/recipe/:id" component={Recipe} />
                  <Route path="/login" component={Login} />
                  <Route path="/logs" component={Logs} />
                  <Route path="/addlog" component={AddLog} />
                  <Route path="/profile" component={Profile} />
                  <Route path="/signup" component={Signup} />
                  <Route
                    path="/auth/google/callback"
                    component={() => {
                      return <Callback source={'google'} />;
                    }}
                  />
                  <Route
                    path="/auth/facebook/callback"
                    component={() => {
                      return <Callback source={'facebook'} />;
                    }}
                  />
                </div>
              </JwtProvider>
            </MuiThemeProvider>
          </BrowserRouter>
        </ApolloProvider>
      </div>
    );
  }
}

export default App;
