import React, { Component } from 'react';
import { TextField } from 'material-ui';
import axios from 'axios';
import Filters from '../filter/Filters';
import SearchResult from '../search-result/SearchResult';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phrase: '',
      recipes: null,
    };
  }
  handleSearch = (event) => {
    if (event.key === 'Enter') {
      // setState is not instant and event.target.value is discarded immediately
      // therefore the search phrase must be saved to a temporary.
      const query = event.target.value;
      this.setState((prevState) => {
        return {
          phrase: query,
        };
      }, () => {
        // this is the callback for this.setState()
        this.getDataFromAPI();
      });
    }
  }

  async getDataFromAPI() {
    const fetchedRecipes = await this.fetchRecipe();
    this.setState({
      recipes: fetchedRecipes,
    });
  }

  fetchRecipe = async () => {
    const data = {
      query: this.state.phrase,
      limit: '50',
      offset: '0',
      filters: [
        {
          field: 'name',
          operator: 'in',
          values: [],
        },
      ],
    };
    const options = {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJlcm5hcmRjb3NncmlmZkBnbWFpbC5jb20iLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTUyMTM0MzA4MX0.ip_Syjb-CQd2payC0Oo6MS911XQZ3OMdDY1hJjnjZ1s',
      },
    };
    try {
      const response = await axios.post('http://api.foodtomake.com/public/recipes', data, options);
      return response.data.recipes;
    } catch (err) {
      return {};
    }
  }

  render() {
    return (
      <div className="container" >
        <div className="logo" >
          <img
            src="https://i.imgur.com/XPjGdyV.png"
            alt="foodtomake logo" />
        </div>

        <div className="search-box" >
          <TextField fullWidth className="" placeholder="Search for a Recipe..." onKeyPress={this.handleSearch}/>
        </div>
        <div className="filters">
          <Filters />
        </div>
        <div className="search-results" >
          <SearchResult recipes={this.state.recipes}/>
        </div>
      </div>
    );
  }
}

export default Home;
