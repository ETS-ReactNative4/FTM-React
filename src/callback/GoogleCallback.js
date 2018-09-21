import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Consumer as JwtConsumer } from '../context/Jwt';
import { Redirect } from 'react-router-dom';
import Username from '../username/Username';

class GoogleCallback extends Component {
  state = {
    googleId: ''
  };

  async componentDidMount() {
    const googleId = await this.props.authMethod();
    this.setState({ googleId });
  }

  render() {
    const LOGIN_QUERY = gql`
    query {
      loginGoogle(googleId: "${this.state.googleId}") {
        token
        error {
          code
        }
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
                      console.log(data);
                      if (data) {
                        if (data.loginGoogle.token) {
                          context.setJwt(data.loginGoogle.token);
                        } else if (
                          data.loginGoogle.error.code === 'USER_NOT_FOUND'
                        ) {
                          console.log(data.loginGoogle.error);
                          return <Username googleId={this.state.googleId} />;
                        }
                      }
                      return <Redirect to="/" />;
                    }
                  }}
                </Query>
              );
            }}
          </JwtConsumer>
        ) : (
          'Loading Jwt...'
        )}
      </div>
    );
  }
}

export default GoogleCallback;
