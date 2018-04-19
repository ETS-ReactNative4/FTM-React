import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TextField } from 'material-ui';
import Filters from '../filter/Filters';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div className="container" >
        <div className="logo" >
          <img 
            src="https://i.imgur.com/XPjGdyV.png"
            alt="foodtomake logso" />
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
