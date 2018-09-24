import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';
import './Signup.css';
import fbLogo from '../assets/images/fb-logo.png';
import ggLogo from '../assets/images/g-ico.png';
import Auth from '../auth/Auth';

class Login extends Component {
  auth = new Auth();

  loginGoogle = () => {
    this.auth.loginGoogle();
  };

  loginFacebook = () => {
    this.auth.loginFacebook();
  };

  render() {
    return (
      <form className="login-root">
        <div className="social-buttons">
          <Button
            onClick={this.loginFacebook}
            variant="raised"
            color="primary"
            id="fb-btn"
          >
            <img id="fb-logo" alt="fb-logo" src={fbLogo} />
            Sign up With Facebook
          </Button>
          <Button onClick={this.loginGoogle} variant="raised" id="google-btn">
            <img id="gg-logo" alt="gg-logo" src={ggLogo} />
            Sign up With Google
          </Button>
        </div>
        <TextField label="Email" fullWidth className="email" />
        <TextField label="Username" fullWidth className="username" />
        <TextField label="Password" fullWidth className="password" />
        <TextField label="Verify Password" fullWidth className="verify" />
        <Button variant="raised" color="primary" className="submit-btn">
          Submit
        </Button>
      </form>
    );
  }
}

export default Login;
