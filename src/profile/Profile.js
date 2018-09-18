import React, { Component } from 'react';
import { Grid } from 'material-ui';
import ProfilePicture from './profilePicture/ProfilePicture';
import ProfileDescription from './profileDescription/ProfileDescription';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import './Profile.css';

const client = new ApolloClient({
  uri: 'http://localhost:8081/graphql',
});

const styles = {
  spacing: 24,
  sizes: {
    xs: {
      picture: 12,
      description: 12,
      recipes: 12,
    },
    sm: {
      picture: 4,
      description: 4,
      recipes: 8,
    },
  },
};

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_image: 'https://i.imgur.com/4AiXzf8.jpg',
      name: 'mckay test',
      description: 'This is a short description of the user. This is a short description of the user. This is a short description of the user. This is a short description of the user. This is a short description of the user.',
      user_id: null,
    };
    this.getDataFromAPI();
  }

  async getDataFromAPI() {

  }

  fetchUser = async () => {

  }
  getDataFromAPI = async () => {
    console.log('trying to get user info');
    const data = {
      username: this.state.name,
    };
    try {
      const result = client
        .query({
          query: gql`{           
            userByUsername(
              username: "${data.username}"
            ) {
              id
              username
            }
          }
        `,
        })
        .then(result => console.log(result.data.userByUsername));
      return result.data;
    } catch (err) {
      console.log(err);
      return {};
    }
  }

  render() {
    return (
      <div>
        <Grid className='user-container' container spacing={styles.spacing} justify={'center'}>
          <Grid className='picture' item xs={styles.sizes.xs.picture} sm={styles.sizes.sm.picture}>
            <ProfilePicture name={this.state.name} imageURL={this.state.user_image} />
          </Grid>
          <Grid className='description' item xs={styles.sizes.xs.description} sm={styles.sizes.sm.description}>
            <ProfileDescription desc={this.state.description}/>
          </Grid>
          <Grid className='users-recipes' item xs={styles.sizes.xs.recipes} sm={styles.sizes.sm.recipes}>
            This is a place holder for the users recipes. Can be copied from home page design mostly?
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Profile;
