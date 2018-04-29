import React, { Component } from 'react';
import { TextField } from 'material-ui';
import axios from 'axios';
import Filters from '../filter/Filters';
import SearchResult from '../search-result/SearchResult';
import './Home.css';
import '../../node_modules/animate.css/animate.min.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phrase: '',
      recipes: [],
    };
  }
  handleSearch = (event) => {
    if (event.key === 'Enter') {
      // setState is not instant and event.target.value is discarded immediately
      // therefore the search phrase must be saved to a temporary.
      const query = event.target.value;
      this.setRecipes(query);
    }
  }

  async setRecipes(query) {
    const recipes = await this.fetchRecipes(query);
    this.setState({
      recipes,
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

  render() {
    return (
      <div className="home-container" >
        <img className="logo"
          src="https://i.imgur.com/XPjGdyV.png"
          alt="foodtomake logo" />
        <div className="search-box" >
          <TextField fullWidth className="" placeholder="Search for a Recipe..." onKeyPress={this.handleSearch}/>
        </div>
        <div className="filters">
          <Filters />
        </div>
        <div className="search-results">
          { this.state.recipes.map(recipe => <SearchResult key={recipe._id} recipe={recipe} />) }
        </div>
      </div>
    );
  }
}

export default Home;
