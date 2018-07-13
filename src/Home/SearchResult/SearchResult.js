import React, { Component } from 'react';
import { Paper } from 'material-ui';
import PropTypes from 'prop-types';
import './SearchResult.css';

class HomeSearchResult extends Component {
  static propTypes = {
    recipe: PropTypes.object.isRequired,
  }

  // handleClick = (tile) => {
  //   tile.defaultPrevented();
  // }

  render() {
    return (
      <Paper>
        <div className="search-root">
          <img className="recipe-image" alt="recipe" src={this.props.recipe.images[0]} />
        </div>
      </Paper>
    );
  }
}

HomeSearchResult.defaultProps = {
  recipes: {},
};

export default HomeSearchResult;

