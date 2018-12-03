import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  MenuList,
  MenuItem,
  ClickAwayListener,
  Popper,
  Grow,
  Paper,
} from '@material-ui/core';
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

  handleClose = (item, event) => {
    if (!(item instanceof MouseEvent)) {
      // console.log(item);
    }
    this.setState({ anchorEl: null });
  };

  handleNewChip = (title, item) => {
    if (!(item instanceof MouseEvent)) {
      this.props.handleAddFilterChip(title, item);
    }
    this.setState({ anchorEl: null });
  };

  render() {
    const { active, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const { title } = this.props;
    const listItems = this.props.items.map((item, index) => (
      <MenuItem key={index} onClick={event => this.handleNewChip(title, item)}>
        {item}
      </MenuItem>
    ));
    return (
      <div style={{ width: '100%', flex: '1' }}>
        <Button
          buttonRef={(node) => {
            this.anchorEl = node;
          }}
          style={{ justifySelf: 'center' }}
          aria-owns={open ? 'filter-list-grow' : null}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="primary"
        >
          {title}
        </Button>
        <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="filter-list-grow"
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList>{listItems}</MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    );
  }
}

FilterButton.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};

export default FilterButton;
