import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import { ApolloProvider } from 'react-apollo';
import './Root.css';
import App from './App';
import AppBar from './home/AppBar/AppBar';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { createUploadLink } from 'apollo-upload-client';

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: ApolloLink.from([
    withClientState({
      cache,
      defaults: {
        token: '',
        userId: ''
      }
    }),
    createUploadLink({
      uri: 'http://localhost:8081/graphql' //'https://api.foodtomake.com/graphql'
    })
  ]),
  cache
});

const theme = createMuiTheme({
  palette: {
    primary: blue
  }
});
class Root extends Component {
  render() {
    return (
      <div className="app-container">
        <ApolloProvider client={client}>
          <BrowserRouter>
            <MuiThemeProvider theme={theme}>
              <div className="app-bar">
                <AppBar />
              </div>
              <div className="content-area">
                <App />
              </div>
            </MuiThemeProvider>
          </BrowserRouter>
        </ApolloProvider>
      </div>
    );
  }
}

export default Root;
