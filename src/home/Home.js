import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TextField } from 'material-ui';
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
      </div>
    );
  }
}

export default Home;
