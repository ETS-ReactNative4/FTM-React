import React, { Component } from 'react';
import {
  Input,
  InputAdornment,
  InputLabel,
  IconButton,
  Paper,
  FormControl
} from '@material-ui/core';
import { FilterList, Close } from '@material-ui/icons';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import HomeFilter from './Filter/Filter';
import SearchResult from './SearchResult/SearchResult';
import './Home.css';

class Home extends Component {
  state = {
    query: '',
    recipes: [],
    loading: false,
    showFilter: false
  };

  handleSearch = event => {
    if (event.key === 'Enter') {
      this.setState({
        query: event.target.value
      });
    }
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

  render() {
    const RECIPES_QUERY = gql`
    query {
      searchAllRecipes(query: "${this.state.query}") {
        id
        name
      }
    }
  `;

    return (
      <div className="home-container">
        <img
          className="logo"
          src="https://i.imgur.com/XPjGdyV.png"
          alt="foodtomake logo"
        />
        <div className="search-box">
          <FormControl fullWidth>
            <InputLabel htmlFor="search">Search for a Recipe...</InputLabel>
            <Input
              id="search"
              onKeyPress={this.handleSearch}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onMouseDown={this.handleMouseDown}
                    onClick={this.toggleFilter}
                  >
                    <FilterList size={30} />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
        <div className="search-results">
          {this.state.query && (
            <Query query={RECIPES_QUERY}>
              {({ loading, error, data }) => {
                if (loading) {
                  return 'Loading...';
                }
                console.log(data);
                return data.searchAllRecipes.map(recipe => (
                  <SearchResult key={recipe.id} recipe={recipe} />
                ));
              }}
            </Query>
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

export default Home;
