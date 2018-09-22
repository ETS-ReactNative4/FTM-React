import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import './Username.css';
import { client } from '../App';
import gql from 'graphql-tag';
import { observer, inject } from 'mobx-react';

const Username = inject('store')(
  observer(
    class Username extends Component {
      state = {
        usernameExists: false,
        username: '',
        error: ''
      };

      onSubmit = async event => {
        event.preventDefault();
        await this.props.store.authStore.createUser(this.props.id, this.state.username, this.props.source);
        //this.props.store.authStore.setJwt('hello');
        // this.setState({ jwt: 'hello' });
        
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
            {this.store.authStore.jwt ? (
              <Redirect exact to="/" />
            ) : (
              <form className="username-root" onSubmit={this.onSubmit}>
                <TextField
                  label="Username"
                  fullWidth
                  className="username"
                  onChange={this.handleOnChange}
                  error={this.props.store.authStore.error.length > 0}
                  helperText={this.props.store.authStore.error}
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
  )
);

export default Username;
