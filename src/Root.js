import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import App from './App';

export const client = new ApolloClient({
  clientState: {
    defaults: {
      jwt: ''
    },
    resolvers: {
      Mutation: {
        setJwt: (_, { jwt }, { cache }) => {
          cache.writeData({ jwt });
          return null;
        }
      }
    }
  },
  uri: 'https://api.foodtomake.com/graphql'
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
              <App />
            </MuiThemeProvider>
          </BrowserRouter>
        </ApolloProvider>
      </div>
    );
  }
}

export default Root;
