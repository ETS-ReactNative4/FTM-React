import React, { Component } from 'react';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { IconButton, Paper } from 'material-ui';
import { FormControl } from 'material-ui/Form';
import { FilterList, Close } from '@material-ui/icons';
import axios from 'axios';
import Filters from '../filter/Filters';
import SearchResult from '../search-result/SearchResult';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phrase: '',
      recipes: [],
      loading: false,
      showFilter: false,
    };
  }
  handleSearch = (event) => {
    if (event.key === 'Enter') {
      // setState is not instant and event.target.value is discarded immediately
      // therefore the search phrase must be saved to a temporary.
      const query = event.target.value;
      this.setState((prevState) => {
        return { ...prevState, loading: true };
      });
      this.setRecipes(query);
    }
  }

  async setRecipes(query) {
    const recipes = await this.fetchRecipes(query);
    this.setState((prevState) => {
      return { ...prevState, recipes, loading: false };
    });
  }

  fetchRecipes = async (query) => {
    const data = {
      query,
      limit: '50',
      offset: '0',
      filters: [],
    };
    try {
      const response = await axios.post('http://api.foodtomake.com/public/recipes', data);
      return response.data.recipes;
    } catch (err) {
      return {};
    }
  }

  toggleFilter = () => {
    this.setState({ showFilter: !this.state.showFilter });
  }

  getFilterClassNames = () => {
    const classes = ['filter-card'];
    if (this.state.showFilter) {
      classes.push('showFilter');
    } else {
      classes.push('hideFilter');
    }
    return classes.join(' ');
  }

  handleMouseDown = (event) => {
    event.preventDefault();
  };

  render() {
    return (
      <div className="home-container" >
        <img className="logo"
          src="https://i.imgur.com/XPjGdyV.png"
          alt="foodtomake logo" />
        <div className="search-box" >
          <FormControl fullWidth>
            <InputLabel htmlFor="search">Search for a Recipe...</InputLabel>
            <Input id="search" onKeyPress={this.handleSearch} endAdornment={
              <InputAdornment position="end">
                <IconButton onMouseDown={this.handleMouseDown} onClick={this.toggleFilter}>
                  <FilterList size={30} />
                </IconButton>
              </InputAdornment>
            }>
            </Input>
          </FormControl>
        </div>
        <div className="filters">
          <Filters />
        </div>
        <div className="search-results">
          { this.state.recipes.map(recipe => <SearchResult key={recipe._id} recipe={recipe} />) }
        </div>
        <Paper className={this.getFilterClassNames()} elevation={5}>
          <IconButton className="close-filters" onClick={this.toggleFilter}>
            <Close/>
          </IconButton>
        </Paper>
      </div>
    );
  }
}

export default Home;
