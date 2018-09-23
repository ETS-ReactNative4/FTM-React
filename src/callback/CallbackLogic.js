import React, { Component } from 'react';
// import { Query } from 'react-apollo';
// import gql from 'graphql-tag';
import Error from '../error/Error';
import Loading from '../loading/Loading';
import { Redirect } from 'react-router-dom';
import Username from '../username/Username';
import { graphql } from 'react-apollo';
import { loginSocial } from '../graphql/queries';

class CallbackLogic extends Component {
  render() {
    console.log(this.props);
    const { res, loading, error, id, source } = this.props;
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
    console.log(token);
    return <Redirect to="/" />;
  }
}

export default graphql(loginSocial, {
  options: props => ({ variables: { id: props.id, source: props.source } }),
  props: ({ data: { loginSocial, loading, error } }) => ({
    res: loginSocial,
    loading,
    error
  })
})(CallbackLogic);
