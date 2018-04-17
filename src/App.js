import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import FTMAppBar from './ftmAppBar/FTMAppBar';
import Home from './home/Home';
import Recipe from './recipe/Recipe';
import Login from './login/Login';
import './App.css';

const theme = createMuiTheme();

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <BrowserRouter>
          <MuiThemeProvider theme={theme}>

            <div className="app-bar">
              <FTMAppBar/>
            </div>
            <div className="content-area">
              <Route exact path="/" component={Home} />
              <Route path="/recipe" component={Recipe} />
              <Route path="/login" component={Login} />
            </div>
          </MuiThemeProvider>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
