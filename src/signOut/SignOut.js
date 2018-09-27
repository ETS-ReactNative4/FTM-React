import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import { Redirect } from 'react-router-dom';

class SignOut extends Component {
  componentDidMount() {
    this.props.client.writeData({ data: { token: '' } });
  }

  render() {
    return <Redirect to="/" />;
  }
}

export default withApollo(SignOut);