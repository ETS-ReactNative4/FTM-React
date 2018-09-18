import React, { Component } from 'react';
import Auth from '../auth/Auth';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Consumer as JwtConsumer } from '../context/Jwt';
import { Redirect } from 'react-router-dom';

const auth0 = new Auth();

class GoogleCallback extends Component {
  state = {
    googleId: ''
  };

  componentDidMount() {
    this.props
      .authPromise()
      .then(googleId => {
        console.log('GID:' + googleId);
        this.setState({ googleId });
      })
      .catch(err => {
        console.log(err);
        this.setState({ googleId: '' });
      });
  }

  render() {
    const LOGIN_QUERY = gql`
    query {
      loginGoogle(googleId: "${this.state.googleId}") {
        token
      }
    }
    `;

    return (
      <div>
        {this.state.googleId ? (
          <JwtConsumer>
            {context => {
              return (
                <Query query={LOGIN_QUERY}>
                  {({ loading, error, data }) => {
                    if (loading) {
                      return 'Waiting on query...';
                    } else {
                      context.setJwt(data.loginGoogle.token);
                      return <Redirect to="/" />;
                    }
                  }}
                </Query>
              );
            }}
          </JwtConsumer>
        ) : (
          'Loading...'
        )}
      </div>
    );
  }
}

export default GoogleCallback;
