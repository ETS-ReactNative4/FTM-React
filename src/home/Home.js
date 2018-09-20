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
import { Spring } from 'react-spring';
import gql from 'graphql-tag';
import HomeFilter from './Filter/Filter';
import SearchResult from './SearchResult/SearchResult';
import './Home.css';
import { client } from '../App';

class Home extends Component {
  state = {
    query: '',
    recipes: [],
    showFilter: false,
  };

  handleEnterSearch = async (event) => {
    if (event.key === 'Enter') {
      const { data } = await client.query({
        query: gql`
                query {
                  searchAllRecipes(query: "${this.state.query}") {
                    id
                    name
                    description
                  }
                }`,
      });
      this.setState({
        recipes: data.searchAllRecipes,
      });
    }
  };

  handleButtonSearch = async () => {
    const { data } = await client.query({
      query: gql`
                query {
                  searchAllRecipes(query: "${this.state.query}") {
                    id
                    name
                    description
                  }
                }`,
    });
    this.setState({
      recipes: data.searchAllRecipes,
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
    return (
      <div className="home-container">
        {this.state.recipes.length > 0 ? (
          <Spring from={{ marginTop: 0, opacity: 1 }} to={{ marginTop: -200, opacity: 0 }}>
            {({ marginTop, opacity }) => (
              <img
                className="logo"
                style={{ marginTop }}
                src="https://i.imgur.com/XPjGdyV.png"
                alt="foodtomake logo"
              />
            )}
          </Spring>
        ) : (
          <Spring from={{ marginTop: -200, opacity: 0 }} to={{ marginTop: 0, opacity: 1 }}>
            {({ marginTop, opacity }) => (
              <img
                className="logo"
                style={{ marginTop, opacity }}
                src="https://i.imgur.com/XPjGdyV.png"
                alt="foodtomake logo"
              />
            )}
          </Spring>
        )}
        {this.state.recipes.length > 0 ? (
          <Spring from={{ marginTop: 0 }} to={{ marginTop: -200 }}>
            {({ marginTop }) => (
              <div className="search-box" style={{ marginTop }}>
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
            )}
          </Spring>
        ) : (
          <Spring from={{ marginTop: -200 }} to={{ marginTop: 0 }}>
            {({ marginTop }) => (
              <div className="search-box" style={{ marginTop }}>
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
            )}
          </Spring>
        )}

        <div className="search-results" style={{ marginTop: -200 }}>
          {this.state.recipes &&
            this.state.recipes.map((recipe) => {
              return (
                <SearchResult key={recipe.id} name={recipe.name} description={recipe.description} />
              );
            })}
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
