import React, { Component } from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import { getToken } from './graphql/queries';

export default function withLocalData(wrappedComponent, withApollo) {
  return withApollo
    ? compose(
        withApollo,
        graphql(getToken, {
          props: ({ data: { token } }) => ({ token })
        })
      )(wrappedComponent)
    : graphql(getToken, {
        props: ({ data: { token } }) => ({ token })
      })(wrappedComponent);
}
