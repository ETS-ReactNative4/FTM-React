import React, { Component } from 'react';
import { Button, TextField } from 'material-ui';
import './Login.css';
import fbLogo from '../images/fb-logo.png';
import ggLogo from '../images/g-ico.png';

class Login extends Component {
  render() {
    return (
      <form className="login-root">
        <div className="social-buttons">
          <Button variant="raised" color="primary" id="fb-btn"><img alt="fb-logo" id="fb-logo" src={fbLogo} />Log in With Facebook</Button>
          <Button variant="raised" id="google-btn"><img id="gg-logo" alt="gg-logo" src={ggLogo} />Log in With Google</Button>
        </div>
        <TextField label="Username or Email" fullWidth className="username" />
        <TextField label="Password" fullWidth className="password" />
        <Button variant="raised" color="primary" className="submit-btn">Submit</Button>
      </form>
    );
  }
}

export default Login;
