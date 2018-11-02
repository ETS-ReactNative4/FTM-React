import React, { Component } from 'react';
import { Grid, GridList, FormControl, Input, InputLabel, InputAdornment, IconButton, Button } from '@material-ui/core';
import { FilterList, Close } from '@material-ui/icons';
import { Spring, Trail, animated } from 'react-spring';
import gql from 'graphql-tag';
import { compose, withApollo } from 'react-apollo';
import ProfilePicture from './ProfilePicture/ProfilePicture';
import SearchResult from '../home/SearchResult/SearchResult';
import Social from './Social/Social';
import Loading from '../loading/Loading';
import './Profile.css';
import withLocalData from '../withLocalData';

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
      user_image: 'http://i65.tinypic.com/2rnvc7k.png',
      username: null,
      user_id: null,
      owned_recipes: [],
      saved_recipes: [],
      following: [],
      query: '',
      currently_viewing: 'saved', /** ********** saved, owned, or followers *************** */
    };
    
    this.showResults = this.showResults.bind(this);
    this.followUser = this.followUser.bind(this);
    this.updateFollowing = this.updateFollowing.bind(this);
    // this.getDataFromAPI();
  }

  showResults(arg) {
    this.setState({
      currently_viewing: arg,
    }, () => this.printClicked());
  }
  printClicked() {
    console.log('clicked: ', this.state.currently_viewing);
  }

  componentWillMount() {
    this.getDataFromAPI();
  }

  handleQueryChange = (event) => {
    this.setState({
      query: event.target.value,
    });
  };

  handleMouseDown = (event) => {
    event.preventDefault();
  };

  handleEnterSearch = async (event) => {
    const { client } = this.props;
    if (event.key === 'Enter') {
      const { data } = await client.query({
        query: gql`
          query {
            searchSavedRecipes(userId: "${this.state.user_id}" query: "${this.state.query}") {
              id
              name
              description
              images
            }
          }`,
      });
      this.setState({
        loading: true,
        saved_recipes: data.searchSavedRecipes,
      });
    }
  };

  handleButtonSearch = async () => {
    const { client } = this.props;
    const { data } = await client.query({
      query: gql`
        query {
          searchSavedRecipes(userId: "${this.state.user_id}" query: "${this.state.query}") {
            id
            name
            description
            images
          }
        }`,
    });
    this.setState({
      loading: true,
      saved_recipes: data.searchSavedRecipes,
    });
  };

  
  updateFollowing = async () => {
    console.log('Update Following');

    
    // First need to get the logged in users followers 
    console.log('--------------------- tyring to get following');
    const { client, userId } = this.props;
    const info = {
      user_id: userId,
    };
    const result = await client.query({
      query: gql`
        query {
          userById(id: "${info.user_id}") {
            id
            username
            following {id username}
          }
        }`,
    })
    .then((result) => {
      console.log('result from getting userByID: ', result.data.userById);
      this.setState({
        following: result.data.userById.following,
      });
      return result.info;
    });
    console.log('------------ after get following');



    // then get the other users info to follow them.
    const { data } = await client.query({
      query: gql`
        query {
          userByUsername(username: "${this.state.username}") {
            id
            username
          }
        }`,
    })
    .then((result) => {
      console.log('result from getting userbyUsername: ', result.data.userByUsername);
      console.log('current following: ', this.state.following);
      this.setState(previousState => ({
        following: [...previousState.following, result.data.userByUserName],
      }), this.followUser);
      return result.data;
    });

    
  }
  

  followUser = async () => {
    
    try {
      const { client, userId } = this.props;
      const data = {
        user_id: userId,
        other_user: this.state.username,
      };
      console.log('updated following: ', this.state.following);
      console.log('user: ', data.user_id, ' trying to follow: ', data.other_user);
      const result = client
        .mutate({
          mutation: gql`
          mutation UpdateUsers($userUpdates: UpdateUserInput!) {           
            updateUser(
              userId: "${data.user_id}"
              userUpdates: $userUpdates
            ) {
              id
              username
              following {id username}
            }
          }
        `,
          variables: {
            userUpdates: {
              following: this.state.following,
            },
          },
        })
        .then((result) => {
          console.log('user followed: ', result.data);
          return result.data;
        });
      return result;
    } catch (err) {
      console.log(err);
      return {};
    }
  }

  async getDataFromAPI() {
    let user;
    if (this.props.match.params.username) {
      user = await this.fetchOtherUser();
    } else {
      user = await this.fetchUser();
    }

    console.log('user: \n', user);
    this.setState({
      user_id: user.id,
      username: user.username,
      owned_recipes: user.ownedRecipes,
      saved_recipes: user.savedRecipes,
      following: user.following,
    });
  }

  fetchUser = async () => {
    try {
      const { client, token } = this.props;
      const decoded = jwt.decode(token);
      console.log('decoded is this: ', decoded.id);
      const result = client
        .query({
          query: gql`{           
            userById(
              id: "${decoded.id}"
            ) {
              id
              username
              ownedRecipes {name id description images}
              savedRecipes {name id description images}
              following {id username}
            }
          }
        `,
          fetchPolicy: 'network-only',
        })
        .then((result) => {
          console.log('fetchUser: ', result.data.userById);
          return result.data.userById;
        });
      return result;
    } catch (err) {
      console.log(err);
      return {};
    }
  };

  fetchOtherUser = async () => {
    console.log('get other user: ', this.props.match.params.username);
    try {
      const { client, token } = this.props;
      const result = client
        .query({
          query: gql`{           
            userByUsername(
              username: "${this.props.match.params.username}"
            ) {
              id
              username
              ownedRecipes {name id description images}
              savedRecipes {name id description images}
            }
          }
        `,
          fetchPolicy: 'network-only',
        })
        .then((result) => {
          console.log('data got back: \n', result.data.userByUsername);
          return result.data.userByUsername;
        });
      return result;
    } catch (err) {
      console.log('Error: ', err);
      return {};
    }
  };

  render() {
    // don't render until we have data loaded
    if (!this.state.username) {
      return <Loading />;
    }

    let savedShow = true;
    let ownedShow = false;
    let followShow = false;
    if (this.state.currently_viewing === 'saved') {
      savedShow = true;
      ownedShow = false;
      followShow = false;
    } else if (this.state.currently_viewing === 'owned') {
      savedShow = false;
      ownedShow = true;
      followShow = false;
    } else if (this.state.currently_viewing === 'followers') {
      savedShow = false;
      ownedShow = false;
      followShow = true;
    }
  
    let myProfile = true;
    if (this.props.match.params.username) {
      myProfile = false; // viewing somebody elses profile
    }
    else {
      myProfile = true;
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
              owned_recipes_number={this.state.owned_recipes.length}
              saved_recipes_number={this.state.saved_recipes.length}
              followers_number="0"
              showResults = {this.showResults}
              my_profile = {myProfile}
              followUser = {this.updateFollowing}
            />
          </Grid>
          <Grid
            className='search-box'
            item
            xs={styles.sizes.xs.social}
            sm={styles.sizes.sm.social}
          >
            <Spring
              from={{ marginTop: 0 }}
              to={this.state.saved_recipes.length > 0 ? { marginTop: 0 } : { marginTop: 0 }}
            >
              {({ marginTop }) => (
                <div className="search-box" style={{ marginTop }}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="search">Search for a recipe...</InputLabel>
                    <Input
                      id="search"
                      onKeyPress={this.handleEnterSearch}
                      onChange={this.handleQueryChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton onMouseDown={this.handleMouseDown} onClick={this.toggleFilter}>
                            <FilterList size={30} />
                          </IconButton>
                          <Button id="searchButton" onClick={this.handleButtonSearch}>
                        Search
                          </Button>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </div>
              )}
            </Spring>
          </Grid>
          <Grid
            className="users-recipes"
            item
            xs={styles.sizes.xs.recipes}
            sm={styles.sizes.sm.recipes}
          >
            <div className="search-results">

              {savedShow &&
                <GridList className={styles.gridList}>
                  <Trail
                    native
                    keys={this.state.saved_recipes}
                    from={{ marginTop: 500, opacity: 1 }}
                    to={{ marginTop: 0, opacity: 1 }}
                  >

                    {this.state.saved_recipes.map(recipe => (marginTop, index) => {
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
              }

              {ownedShow && myProfile &&
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
              }

              {followShow &&
                <h2>Show Followers</h2>
              }
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default compose(
  withLocalData,
  withApollo,
)(Profile);
