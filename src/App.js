import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import FTMAppBar from './ftmAppBar/FTMAppBar';
import Home from './Home/Home';
import Recipe from './Recipe/Recipe';
import Login from './Login/Login';
import Logs from './logs/Logs';
import './App.css';

const theme = createMuiTheme();

const data = {
  title: 'testing title',
};
class App extends Component {
  render() {
    return (
      <div className="app-container">
        <BrowserRouter>
          <MuiThemeProvider theme={theme}>
            <div className="app-bar">
              <FTMAppBar />
            </div>
            <div className="content-area" >
              <Route exact path="/" component={Home} />
              <Route exact path="/recipe" component={Recipe}/>
              <Route exact path="/recipe/:title" component={Recipe}/>
              <Route exact path="/recipe/:author/:title" component={Recipe}/>
              <Route path="/login" component={Login} />
              <Route path="/logs" component={Logs} />
            </div>
          </MuiThemeProvider>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
