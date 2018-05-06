import React, { Component } from 'react';
import { Button, TextField } from 'material-ui';
import './Signup.css';
import fbLogo from '../images/fb-logo.png';
import ggLogo from '../images/g-ico.png';

class Login extends Component {
  render() {
    return (
      <form className="login-root">
        <div className="social-buttons">
          <Button variant="raised" color="primary" id="fb-btn"><img id="fb-logo" src={fbLogo} />Sign up With Facebook</Button>
          <Button variant="raised" id="google-btn"><img id="gg-logo" src={ggLogo} />Sign up With Google</Button>
        </div>
        <TextField label="Email" fullWidth className="email" />
        <TextField label="Username" fullWidth className="username" />
        <TextField label="Password" fullWidth className="password" />
        <TextField label="Verify Password" fullWidth className="verify" />
        <Button variant="raised" color="primary" className="submit-btn">Submit</Button>
      </form>
    );
  }
}

export default Login;
