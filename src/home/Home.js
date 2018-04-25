import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router-dom';
import { TextField } from 'material-ui';
import Filters from '../filter/Filters';
import Recipe from '../recipe/Recipe';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'propstitle',
    }
  }
  render() {
    const title = 'propstitle';
    const desc = 'props description';
    return (
      <div className="container" >
        <div className="logo"  >
          <img 
            src="https://i.imgur.com/XPjGdyV.png"
            alt="foodtomake logo" />
        </div>
        <div className="search-box">
          <TextField fullWidth className="" placeholder="Search for a Recipe..." />
        </div>
        <div className="filters">
          <Filters />
        </div>
      </div>
    );
  }
}

export default Home;
