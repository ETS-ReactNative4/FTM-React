import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, Paper } from 'material-ui';
import './Filter.css';

class Filter extends Component {
  render() {
    return (
      <Paper>
        <div className="filter-root">
          <Button variant="raised" color="primary" className="filter-button">
            <Typography className="filter-title" variant="button">
              {this.props.filter}
            </Typography>
          </Button>
        </div>
      </Paper>
    );
  }
}

Filter.propTypes = {
  filter: PropTypes.string,
};

export default Filter;
