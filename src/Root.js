import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import './Root.css';
import App from './App';
import AppBar from './home/AppBar/AppBar';

export const client = new ApolloClient({
  clientState: {
    defaults: {
      token: ''
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
