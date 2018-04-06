import React, { Component } from 'react';
import { AppBar, Toolbar } from 'material-ui';
import './FTMAppBar.css';

class App extends Component {
  render() {
    return (
      <div id="app-bar">
        <AppBar position="fixed" title="Title">
          <Toolbar>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default App;
