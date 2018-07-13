import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
import AppBar from './Home/AppBar/AppBar';
import Home from './Home/Home';
import Recipe from './Recipe/Recipe';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});
class App extends Component {
  render() {
    return (
      <div className="app-container">
        <BrowserRouter>
          <MuiThemeProvider theme={theme}>
            <div className="app-bar">
              <AppBar />
            </div>
            <div className="content-area" >
              <Route exact path="/" component={Home} />
              <Route exact path="/recipe" component={Recipe}/>
              <Route exact path="/recipe/:title" component={Recipe}/>
              <Route exact path="/recipe/:author/:title" component={Recipe}/>
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
            </div>
          </MuiThemeProvider>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
