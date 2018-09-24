import React, { Component } from 'react';
// import { Query } from 'react-apollo';
// import gql from 'graphql-tag';
import Error from '../error/Error';
import Loading from '../loading/Loading';
import Username from '../username/Username';
import { Redirect } from 'react-router-dom';
import { compose, graphql, withApollo } from 'react-apollo';
import { loginSocial } from '../graphql/queries';

class CallbackLogic extends Component {
  render() {
    const { res, loading, error, id, source, client } = this.props;
    if (error) {
      return <Error />;
    }
    if (loading) {
      return <Loading />;
    }
    const { apiError, token } = res;
    if (apiError) {
      const { code } = apiError;
      if (code === 'USER_NOT_FOUND') {
        return <Username id={id} source={source} />;
      } else {
        return <Error />;
      }
    }
    client.writeData({
      data: {
        token
      }
    });
    return <Redirect to="/" />;
  }
}

export default compose(
  graphql(loginSocial, {
    options: props => ({ variables: { id: props.id, source: props.source } }),
    props: ({ data: { loginSocial, loading, error } }) => ({
      res: loginSocial,
      loading,
      error
    })
  }),
  withApollo
)(CallbackLogic);
