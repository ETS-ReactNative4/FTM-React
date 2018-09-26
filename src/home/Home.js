import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Input,
  InputAdornment,
  InputLabel,
  IconButton,
  Button,
  Paper,
  FormControl,
  withStyles,
  GridList
} from '@material-ui/core';
import { FilterList, Close } from '@material-ui/icons';
import { Spring, Trail, animated } from 'react-spring';
import { withApollo, compose, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import HomeFilter from './Filter/Filter';
import SearchResult from './SearchResult/SearchResult';
import './Home.css';

const styles = {
  gridList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    overflow: 'hidden'
  }
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      recipes: [],
      loading: false,
      showFilter: false
    };
  }

  handleEnterSearch = async event => {
    const { client } = this.props;
    if (event.key === 'Enter') {
      const { data } = await client.query({
        query: gql`
                query {
                  searchAllRecipes(query: "${this.state.query}") {
                    id
                    name
                    description
                    images
                  }
                }`
      });
      this.setState({
        loading: true,
        recipes: data.searchAllRecipes
      });
    }
  };

  handleButtonSearch = async () => {
    const { client } = this.props;
    const { data } = await client.query({
      query: gql`
                query {
                  searchAllRecipes(query: "${this.state.query}") {
                    id
                    name
                    description
                    images
                  }
                }`
    });
    this.setState({
      loading: true,
      recipes: data.searchAllRecipes
    });
  };

  handleQueryChange = event => {
    this.setState({
      query: event.target.value
    });
  };

  toggleFilter = () => {
    this.setState({ showFilter: !this.state.showFilter });
  };

  getFilterClassNames = () => {
    const classes = ['filter-card'];
    if (this.state.showFilter) {
      classes.push('showFilter');
    } else {
      classes.push('hideFilter');
    }
    return classes.join(' ');
  };

  handleMouseDown = event => {
    event.preventDefault();
  };

  uploadFile = async e => {
    const file = e.target.files[0];
    console.log(file);
    const { data } = await this.props.client.mutate({
      mutation: gql`
        mutation uploadPhtoto($file: Upload!) {
          uploadPhoto(file: $file) {
            filename
          }
        }
      `,
      variables: {
        file
      }
    });
    console.log(data.uploadPhoto.filename);
  };

  UPLOAD_FILE = gql`
    mutation uploadPhoto($file: Upload!) {
      uploadPhoto(file: $file) {
        filename
      }
    }
  `;

  render() {
    const { classes } = this.props;
    return (
      <div className="home-container">
        <Mutation mutation={this.UPLOAD_FILE}>
          {uploadFile => (
            <input
              type="file"
              required
              onChange={({
                target: {
                  validity,
                  files: [file]
                }
              }) => {
                validity.valid && uploadFile({ variables: { file } });
              }}
            />
          )}
        </Mutation>
        {/* <input type="file" required onChange={this.uploadFile} /> */}
        <Spring
          from={{ marginTop: 0, opacity: 1 }}
          to={
            this.state.recipes.length > 0
              ? { marginTop: -200 }
              : { marginTop: 0 }
          }
        >
          {({ marginTop, opacity }) => (
            <img
              className="logo"
              style={{ marginTop }}
              src="https://i.imgur.com/XPjGdyV.png"
              alt="foodtomake logo"
            />
          )}
        </Spring>
        <Spring
          from={{ marginTop: 0 }}
          to={
            this.state.recipes.length > 0
              ? { marginTop: -200 }
              : { marginTop: 0 }
          }
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
                      <IconButton
                        onMouseDown={this.handleMouseDown}
                        onClick={this.toggleFilter}
                      >
                        <FilterList size={30} />
                      </IconButton>
                      <Button
                        id="searchButton"
                        onClick={this.handleButtonSearch}
                      >
                        Search
                      </Button>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
          )}
        </Spring>

        <div
          className="search-results"
          style={
            this.state.recipes.length > 0
              ? { marginTop: -200 }
              : { marginTop: 0 }
          }
        >
          {this.state.recipes.length > 0 && (
            <GridList className={classes.gridList}>
              <Trail
                native
                keys={this.state.recipes}
                from={{ marginTop: 500, opacity: 1 }}
                to={{ marginTop: 0, opacity: 1 }}
              >
                {this.state.recipes.map(recipe => (marginTop, index) => {
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
          )}
        </div>
        <Paper className={this.getFilterClassNames()} elevation={5}>
          <IconButton className="close-filters" onClick={this.toggleFilter}>
            <Close />
          </IconButton>
          <HomeFilter filter="Time" color="primary" />
        </Paper>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  withApollo
)(Home);
