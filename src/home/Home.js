import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { TextField } from 'material-ui';
import Recipe from '../recipe/Recipe';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div className="container">
        <Link to="/recipe">Recipe</Link>
        <div className="logo">
        </div>
        <div className="search-box">
          <TextField fullWidth className="" placeholder="Search for a Recipe..." />
        </div>
        <div className="filters">
        </div>
        <Route exact path="/recipe" component={Recipe}/>
      </div>
    );
  }
}

export default Home;
