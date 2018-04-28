import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from 'material-ui';
import './Filter.css';

class Filter extends Component {
  render() {
    return (
      <div className="filter-root">
        <Button className="filter-button">
          <Typography className="filter-title" variant="button">
            {this.props.filter}
          </Typography>
        </Button>
      </div>
    );
  }
}

Filter.propTypes = {
  filter: PropTypes.string,
};

export default Filter;
