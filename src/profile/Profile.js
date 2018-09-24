import React, { Component } from 'react';
import { Grid } from 'material-ui';
import gql from 'graphql-tag';
import { client } from '../Root';
import ProfilePicture from './ProfilePicture/ProfilePicture';
import SearchResult from '../home/SearchResult/SearchResult';
import Social from './Social/Social';
import './Profile.css';

const styles = {
  spacing: 24,
  sizes: {
    xs: {
      picture: 12,
      social: 12,
      recipes: 12
    },
    sm: {
      picture: 8,
      social: 8,
      recipes: 8
    }
  }
};

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_image: 'https://i.imgur.com/4AiXzf8.jpg',
      username: null,
      user_id: '5b80e5924f300af2ea7f05cd',
      owned_recipes: []
    };
    //this.getDataFromAPI();
  }

  componentWillMount() {
    this.getDataFromAPI();
  }

  async getDataFromAPI() {
    const user = await this.fetchUser();
    console.log('user: \n', user);
    this.setState({
      user_id: user.id,
      username: user.username,
      owned_recipes: user.ownedRecipes
    });
  }

  fetchUser = async () => {
    const data = {
      user_id: this.state.user_id
    };
    try {
      const result = client
        .query({
          query: gql`{           
            userById(
              id: "${data.user_id}"
            ) {
              id
              username
              ownedRecipes {name id description}
            }
          }
        `
        })
        .then(result => {
          return result.data.userById;
        });
      return result;
    } catch (err) {
      console.log(err);
      return {};
    }
  };

  render() {
    // don't render until we have data loaded
    if (!this.state.username) {
      return <div />;
    }

    return (
      <div>
        <Grid
          className="user-container"
          container
          spacing={styles.spacing}
          justify={'center'}
        >
          <Grid
            className="picture"
            item
            xs={styles.sizes.xs.picture}
            sm={styles.sizes.sm.picture}
          >
            <ProfilePicture
              name={this.state.username}
              imageURL={this.state.user_image}
            />
          </Grid>
          <Grid
            className="social"
            item
            xs={styles.sizes.xs.social}
            sm={styles.sizes.sm.social}
          >
            <Social
              recipes_number={this.state.owned_recipes.length}
              followers_number="234"
              favorites_number="2,451"
            />
          </Grid>
          <Grid
            className="users-recipes"
            item
            xs={styles.sizes.xs.recipes}
            sm={styles.sizes.sm.recipes}
          >
            <div className="search-results">
              {this.state.owned_recipes.map(recipe => {
                return (
                  <SearchResult
                    key={recipe.id}
                    name={recipe.name}
                    description={recipe.description}
                    r_id={recipe.id}
                  />
                );
              })}
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Profile;
