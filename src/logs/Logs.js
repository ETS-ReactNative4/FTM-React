import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import './Logs.css';

class Logs extends Component {
  render() {
    return (
      <div className="container">
        <Paper elevation={4}>
          <Typography className="form" variant="headline" component="h3">
          Login
          </Typography>
          <img
            src="https://i.imgur.com/4AiXzf8.jpg"
            alt="this is money cat" />
          <Typography className="form" component="p">
          Form
          </Typography>
        </Paper>
      </div>
    );
  }
}

export default Logs;
