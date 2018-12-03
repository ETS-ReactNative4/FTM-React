import React from 'react';
import PropTypes from 'prop-types';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { withStyles } from 'material-ui/styles';

class FilterButton extends React.Component {
  state = {
    anchorEl: null,
  };

  handleChange = (event, checked) => {
    this.setState({ active: checked });
  };

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { active, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const { title } = this.props;
    const listItems = this.props.items.map((link, index) => (
      <MenuItem key={index} onClick={this.handleClose}>
        {link}
      </MenuItem>
    ));
    return (
      <div style={{ width: '100%' }}>
        <Button
          aria-owns={open ? 'filter-button' : null}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="primary"
        >
          {title}
        </Button>
        <Menu id="filter-button" anchorEl={anchorEl} open={open} onClose={this.handleChange}>
          {listItems}
        </Menu>
      </div>
    );
  }
}

FilterButton.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};

export default FilterButton;
