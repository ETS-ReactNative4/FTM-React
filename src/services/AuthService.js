import gql from 'graphql-tag';

export default class AuthService {
  constructor(client) {
    this.client = client;
  }
  createUser = async (id, username, source) => {
    const { data } = await this.client.mutate({
      mutation: gql`
      mutation {
        createUserSocial(id: "${id}",
         username: "${username}",
         type: ${source}) {
          token
          error {
            code
            message
          }
        }
      }`
    });
    return data;
  };
}
