import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';
import './Login.css';
import CustomSnackbar from '../snackbar/CustomSnackbar';
import Auth from '../auth/Auth';
import fbLogo from '../assets/images/fb-logo.png';
import ggLogo from '../assets/images/g-ico.png';

class Login extends Component {
  state = {
    account: '',
    password: '',
  };
  auth = new Auth();

  loginGoogle = () => {
    this.auth.loginGoogle();
  };

  loginFacebook = () => {
    this.auth.loginFacebook();
  };

  handleSubmit = async () => {
    console.log(`${this.state.account} : ${this.state.password}`);
  };

  handleAccountChange = (event) => {
    this.setState({ account: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  render() {
    return (
      <form className="login-root">
        <div className="social-buttons">
          <Button variant="raised" color="primary" id="fb-btn" onClick={this.loginFacebook}>
            <img alt="fb-logo" id="fb-logo" src={fbLogo} />
            Log in With Facebook
          </Button>
          <Button variant="raised" id="google-btn" onClick={this.loginGoogle}>
            <img id="gg-logo" alt="gg-logo" src={ggLogo} />
            Log in With Google
          </Button>
        </div>
        <TextField
          onChange={this.handleAccountChange}
          label="Username or Email"
          fullWidth
          className="username"
        />
        <TextField
          onChange={this.handlePasswordChange}
          label="Password"
          fullWidth
          className="password"
        />
        <Button variant="raised" color="primary" className="submit-btn" onClick={this.handleSubmit}>
          Submit
        </Button>
      </form>
    );
  }
}

export default Login;
