import React, { Component } from 'react';
import Filter from './Filter';
import './Filters.css';


class Filters extends Component {
  arr = ['Time', 'Difficulty', 'Ingredients', 'Author', 'Cuisine', 'Tags', 'Diet', 'Rating']

  render() {
    return (
      <div className="filters-root">
        {this.arr.map(filter => <Filter key={filter} filter={filter} />)}
      </div>
    );
  }
}

export default Filters;
