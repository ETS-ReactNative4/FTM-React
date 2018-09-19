import React, { Component } from 'react';
import {
  Input,
  InputAdornment,
  InputLabel,
  IconButton,
  Button,
  Paper,
  FormControl,
} from '@material-ui/core';
import { FilterList, Close } from '@material-ui/icons';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import HomeFilter from './Filter/Filter';
import SearchResultCard from './SearchResult/SearchResult';
import './Home.css';

class Home extends Component {
  state = {
    query: '',
    recipes: [],
    loading: false,
    showFilter: false,
  };

  handleEnterSearch = (event) => {
    if (event.key === 'Enter') {
      this.setState({
        loading: true,
      });
    }
  };

  handleButtonSearch = () => {
    this.setState({
      loading: true,
    });
  };

  handleQueryChange = (event) => {
    this.setState({
      query: event.target.value,
    });
  };

  toggleFilter = () => {
    this.setState({ showFilter: !this.state.showFilter });
  };

  toggleLoading = () => {
    this.setState({
      loading: !this.state.loading,
    });
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

  handleMouseDown = (event) => {
    event.preventDefault();
  };

  render() {
    const RECIPES_QUERY = gql`
    query {
      searchAllRecipes(query: "${this.state.query}") {
        id
        name
        description
      }
    }
  `;

    return (
      <div className="home-container">
        <img className="logo" src="https://i.imgur.com/XPjGdyV.png" alt="foodtomake logo" />
        <div className="search-box">
          <FormControl fullWidth>
            <InputLabel htmlFor="search">Search for a Recipe...</InputLabel>
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
        <div className="search-results">
          {this.state.query &&
            this.state.loading && (
            <Query query={RECIPES_QUERY}>
              {({ loading, error, data }) => {
                if (loading) {
                  return 'Loading...';
                }
                return data.searchAllRecipes.map((recipe, index) => {
                  return (
                    <SearchResultCard
                      key={index}
                      name={recipe.name}
                      description={recipe.description}
                    />
                  );
                });
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
