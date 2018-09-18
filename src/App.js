import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import FTMAppBar from './ftmAppBar/FTMAppBar';
import Home from './home/Home';
import Recipe from './recipe/Recipe';
import Login from './login/Login';
import Logs from './logs/Logs';
import AddLog from './addlog/AddLog';
import Profile from './profile/Profile';
import CreateRecipe from './createRecipe/CreateRecipe';
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
              <Route path="/addlog" component={AddLog} />
              <Route path="/profile" component={Profile} />
              <Route path="/createrecipe" component={CreateRecipe} />
            </div>
          </MuiThemeProvider>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
