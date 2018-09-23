import { gql } from 'graphql-tag';
export const getJwt = gql`
  query {
    jwt @client
  }
`;
