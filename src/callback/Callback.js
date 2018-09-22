import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Consumer as JwtConsumer } from '../context/Jwt';
import { Redirect } from 'react-router-dom';
import Username from '../username/Username';
import Auth from '../auth/Auth';

const auth = new Auth();

class Callback extends Component {
  state = {
    id: ''
  };

  async componentDidMount() {
    const id = await auth.handleAuthCallback();
    this.setState({ id });
  }

  render() {
    const LOGIN_QUERY = gql`
    query {
      loginSocial(id: "${this.state.id}", type: ${this.props.source}) {
        token
        error {
          code
        }
      }
    }
    `;

    return (
      <div>
        {this.state.id ? (
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
                        if (data.loginSocial.token) {
                          context.setJwt(data.loginSocial.token);
                        } else if (
                          data.loginSocial.error.code === 'USER_NOT_FOUND'
                        ) {
                          console.log(data.loginSocial.error);
                          return (
                            <Username
                              setJwt={context.setJwt}
                              id={this.state.id}
                              source={this.props.source}
                            />
                          );
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

export default Callback;
