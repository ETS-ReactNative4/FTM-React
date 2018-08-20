import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'material-ui';
import './Filter.css';

class HomeFilter extends Component {
  render() {
    return (
      <Button variant="raised" color={this.props.color} className="filter-button">
        {this.props.filter}
      </Button>
    );
  }
}

HomeFilter.propTypes = {
  filter: PropTypes.string,
  color: PropTypes.color,
};

export default HomeFilter;
