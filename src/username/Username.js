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

  onSubmit = async () => {
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
    console.log(data);
    let error = null;
    if (
      data.createUserGoogle.error &&
      data.createUserGoogle.error.code === 'DUPLICATE_USERNAME'
    ) {
      error = 'That username already exists.';
    }
    this.setState({
      jwt: data.createUserGoogle.token,
      error
    });
  };

  handleOnChange = event => {
    this.setState({ username: event.target.value });
  };

  render() {
    return (
      <div>
        {this.state.jwt ? (
          <Redirect to="/" />
        ) : (
          <form className="username-root">
            <TextField
              label="Username"
              fullWidth
              className="username"
              onChange={this.handleOnChange}
            />
            <Button
              variant="raised"
              color="primary"
              className="submit-btn"
              error={this.state.error}
              onClick={this.onSubmit}
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
