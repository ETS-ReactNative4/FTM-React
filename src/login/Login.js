import React, { Component } from 'react';
import { Button, TextField } from 'material-ui';
import './Login.css';
import fbLogo from '../images/fb-logo.png';
import ggLogo from '../images/g-ico.png';

class Login extends Component {
  render() {
    return (
      <div className="login-root">
        <div className="social-buttons">
          <Button variant="raised" color="primary" id="fb-btn"><img id="fb-logo" src={fbLogo} />Log in With Facebook</Button>
          <Button variant="raised" id="google-btn"><img id="gg-logo" src={ggLogo} />Log in With Google</Button>
        </div>
        <div className="g-signin2" data-onsuccess="onSignIn"></div>
        <TextField fullWidth className="username-tf" placeholder="Username" />
        <TextField fullWidth className="password-tf" placeholder="Password"/>
        <Button variant="raised" color="primary" className="submit-btn">Submit</Button>
      </div>
    );
  }
}

export default Login;
