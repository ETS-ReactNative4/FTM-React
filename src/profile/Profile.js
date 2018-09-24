import React, { Component } from 'react';
import { Grid, GridList } from 'material-ui';
import { Trail, animated } from 'react-spring';
import gql from 'graphql-tag';
import { withApollo, compose, graphql } from 'react-apollo';
import ProfilePicture from './ProfilePicture/ProfilePicture';
import SearchResult from '../home/SearchResult/SearchResult';
import Social from './Social/Social';
import Loading from '../loading/Loading';
import { getToken } from './graphql/queries';
import './Profile.css';

const jwt = require('jsonwebtoken');

const styles = {
  spacing: 24,
  sizes: {
    xs: {
      picture: 12,
      social: 12,
      recipes: 12,
    },
    sm: {
      picture: 8,
      social: 8,
      recipes: 8,
    },
  },
  gridList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    overflow: 'hidden',
  },
};

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_image: 'https://i.imgur.com/4AiXzf8.jpg',
      username: null,
      user_id: '5b80e5924f300af2ea7f05cd',
      owned_recipes: [],
    };
    // this.getDataFromAPI();
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
      owned_recipes: user.ownedRecipes,
    });
  }

  fetchUser = async () => {
    const data = {
      user_id: this.state.user_id,
    };
    try {
      const { client, token } = this.props;
      const decoded = jwt.decode(token);
      console.log('decoded is this: ' , decoded);
      const result = client
        .query({
          query: gql`{           
            userById(
              id: "${data.user_id}"
            ) {
              id
              username
              ownedRecipes {name id description images}
            }
          }
        `,
        })
        .then((result) => {
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
      return <Loading />;
    }

    return (
      <div>
        <Grid className="user-container" container spacing={styles.spacing} justify={'center'}>
          <Grid className="picture" item xs={styles.sizes.xs.picture} sm={styles.sizes.sm.picture}>
            <ProfilePicture name={this.state.username} imageURL={this.state.user_image} />
          </Grid>
          <Grid className="social" item xs={styles.sizes.xs.social} sm={styles.sizes.sm.social}>
            <Social
              recipes_number={this.state.owned_recipes.length}
              followers_number="0"
              favorites_number="0"
            />
          </Grid>
          <Grid
            className="users-recipes"
            item
            xs={styles.sizes.xs.recipes}
            sm={styles.sizes.sm.recipes}
          >
            <div className="search-results">
              <GridList className={styles.gridList}>
                <Trail
                  native
                  keys={this.state.owned_recipes}
                  from={{ marginTop: 500, opacity: 1 }}
                  to={{ marginTop: 0, opacity: 1 }}
                >
                  {this.state.owned_recipes.map(recipe => (marginTop, index) => {
                    return (
                      <animated.div key={index} style={marginTop}>
                        <SearchResult
                          key={recipe.id}
                          name={recipe.name}
                          style={marginTop}
                          description={recipe.description}
                          created={recipe.created}
                          images={recipe.images}
                          r_id={recipe.id}
                        />
                      </animated.div>
                    );
                  })}
                </Trail>
              </GridList>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default compose(
  withApollo,
  graphql(getToken, {
    props: ({ data: { token } }) => ({ token }),
  }),
)(Profile);
