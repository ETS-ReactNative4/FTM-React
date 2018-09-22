import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import './Username.css';
import { client } from '../App';
import gql from 'graphql-tag';

class Username extends Component {
  state = {
    usernameExists: false,
    username: '',
    error: ''
  };

  onSubmit = async event => {
    event.preventDefault();
    this.props.setJwt('hello');
    // this.setState({ jwt: 'hello' });
    // const { data } = await client.mutate({
    //   mutation: gql`
    //   mutation {
    //     createUserSocial(id: "${this.props.id}",
    //      username: "${this.state.username}",
    //      type: ${this.props.source}) {
    //       token
    //       error {
    //         code
    //         message
    //       }
    //     }
    //   }`
    // });
    // console.log(data);
    // if (data && data.createUserSocial) {
    //   const { error, token } = data.createUserSocial;
    //   if (error) {
    //     if (error.code === 'DUPLICATE_USERNAME') {
    //       this.setState({ error: 'That username already exists.' });
    //     } else {
    //       this.setState({ error: 'Please try again.' });
    //     }
    //   } else {
    //     this.props.setJwt(token);
    //     this.setState({ jwt: token });
    //   }
    // } else {
    //   this.setState({ error: 'Please try again.' });
    // }
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
          <Redirect exact to="/" />
        ) : (
          <form className="username-root" onSubmit={this.onSubmit}>
            <TextField
              label="Username"
              fullWidth
              className="username"
              onChange={this.handleOnChange}
              error={this.state.error.length > 0}
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
