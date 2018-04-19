import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TextField } from 'material-ui';
import Filter from '../filter/Filter';
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
          <Filter />
        </div>
      </div>
    );
  }
}

export default Home;
