import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import './Username.css';
import { client } from '../App';
import gql from 'graphql-tag';

class Username extends Component {
  state = {
    usernameExists: false,
    username: ''
  };

  onSubmit = async event => {
    event.preventDefault();
    const { data } = await client.mutate({
      mutation: gql`
      mutation {
        createUserGoogle(googleId: "${this.props.googleId}", username: "${
        this.state.username
      }") {
          token
          error {
            code
            message
          }
        }
      }`
    });
    if (data) {
      const { error, token } = data.createUserGoogle;
      if (error) {
        if (error.code === 'DUPLICATE_USERNAME') {
          return this.setState({ error: 'That username already exists.' });
        } else {
          return this.setState({ error: 'Please try again.' });
        }
      } else {
        return this.setState({ jwt: token });
      }
    } else {
      return this.setState({ error: 'Please try again.' });
    }
  };

  handleOnChange = event => {
    this.setState({ username: event.target.value });
  };

  handleOnKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.onSubmit(event);
    }
  };

  render() {
    return (
      <div>
        {this.state.jwt ? (
          <Redirect to="/" />
        ) : (
          <form className="username-root" onSubmit={this.onSubmit}>
            <TextField
              label="Username"
              fullWidth
              className="username"
              onChange={this.handleOnChange}
              error={this.state.error}
              helperText={this.state.error}
            />
            <Button
              variant="raised"
              color="primary"
              className="submit-btn"
              type="submit"
            >
              Submit
            </Button>
          </form>
        )}
      </div>
    );
  }
}

export default Username;
