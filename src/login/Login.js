import React, {Component } from 'react';
import { TextField, Paper, Typography } from 'material-ui';
import './Login.css';
import axios from 'axios';

class Login extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
      passwordconf: '',
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password } = this.state;
    const { dispatch } = this.props;
    if (username && password) {
      this.loginUser(username, password);
    }
  }

  loginUser = async () => {
    console.log('trying login with ', this.state.username, ' ', this.state.password);
    const data = {
      email: this.state.username,
      password: this.state.password,
    };
    try {
      const response = await axios.post('http://localhost:8081/login', data);
      console.log('completed GET request');
      console.log(response);
      return response.data;
    } catch (err) {
      console.log(err);
      return {};
    }
  }

  handleSignup(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { email, username, password } = this.state;
    const { dispatch } = this.props;
    if (email && username && password) {
      this.signUp(email, username, password);
    }
  }
  
  signUp = async () => {
    console.log('trying signup with ', this.state.email, ' ', this.state.username, ' ', this.state.password);
    const data = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      passwordConfirmation: this.state.password,
    };
    try {
      const response = await axios.post('http://localhost:8081/signup', data);
      console.log('completed GET request');
      console.log(response);
      return response.data;
    } catch (err) {
      console.log(err);
      return {};
    }
  }

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
          
          <form name="form" onSubmit={this.handleSubmit}>
            <div className='login-div'>
              <label htmlFor="username">Email</label>
              <input type="text" className="form-control" name="username" value={this.state.username} onChange={this.handleChange} />
              {this.state.submitted && !this.state.username &&
                  <div className="help-block">Username is required</div>
              }
            </div>
            <div className='password-div'>
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.handleChange} />
              {this.state.submitted && !this.state.password &&
                  <div className="help-block">Password is required</div>
              }
            </div>
            <div className="form-group">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
            
        </Paper>
        <Paper elevation={4}>
          <Typography className="form" variant="headline" component="h3">
            Signup
          </Typography>
          
          <form name="form" onSubmit={this.handleSignup}>
            <div className='login-div'>
              <label htmlFor="email">Email</label>
              <input type="text" className="form-control" name="email" value={this.state.email} onChange={this.handleChange}/>
              {this.state.submitted && !this.state.email &&
                  <div className="help-block">Email is required</div>
              }
            </div>
            <div className='login-div'>
              <label htmlFor="username">Username</label>
              <input type="text" className="form-control" name="username" value={this.state.username} onChange={this.handleChange} />
              {this.state.submitted && !this.state.username &&
                  <div className="help-block">Username is required</div>
              }
            </div>
            <div className='password-div'>
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.handleChange} />
              {this.state.submitted && !this.state.password &&
                  <div className="help-block">Password is required</div>
              }
            </div>
            <div className="form-group">
              <button className="btn btn-primary">Sign up</button>
            </div>
          </form>
            
        </Paper>
      </div>
    );
  }
}

export default Login;