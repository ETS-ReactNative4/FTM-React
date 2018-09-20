import React, { Component } from 'react';
import { Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
import './SearchResult.css';

class HomeSearchResult extends Component {
  static propTypes = {
    recipe: PropTypes.object.isRequired
  };

  render() {
    const { name } = this.props.recipe;
    return (
      <Paper>
        <div className="search-root">{name}</div>
      </Paper>
    );
  }
}

HomeSearchResult.defaultProps = {
  recipes: {}
};

export default HomeSearchResult;
