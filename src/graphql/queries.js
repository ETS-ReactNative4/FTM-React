import gql from 'graphql-tag';

export const getJwt = gql`
  query {
    jwt @client
  }
`;

export const loginSocial = gql`
  query LoginSocial($id: String!, $source: SocialType!) {
    loginSocial(id: $id, type: $source) {
      token
      apiError {
        code
      }
    }
  }
`;
