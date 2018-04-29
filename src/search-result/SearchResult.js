import React, { Component } from 'react';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './SearchResult.css';
import '../../node_modules/animate.css/animate.min.css';

class SearchResult extends Component {
  static propTypes = {
    recipe: PropTypes.object.isRequired,
  }

  // handleClick = (tile) => {
  //   tile.defaultPrevented();
  // }

  render() {
    return (
      <div className="search-root">
      </div>
    );
  }
}

SearchResult.defaultProps = {
  recipes: {},
};

export default SearchResult;

