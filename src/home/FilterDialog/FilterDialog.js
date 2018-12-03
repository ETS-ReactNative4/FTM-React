import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withStyles,
} from '@material-ui/core';

const styles = theme => ({});
const initialState = {
  open: false,
  includes: [],
  excludes: [],
};

class FilterDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  reset() {
    this.setState(initialState);
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleCancel = () => {
    this.setState({ open: false, includes: [], excludes: [] });
  };

  handleSave = () => {
    this.props.handleIngredientsFilter(this.state.includes, this.state.excludes);
    this.setState({ open: false });
  };

  handleOnChangeIncludes = (event) => {
    const trimmedIncludes = event.target.value.replace(/\s/g, '-');
    this.setState((prevState, props) => ({
      includes: trimmedIncludes.split(','),
    }));
  };

  handleOnChangeExcludes = (event) => {
    const trimmedExcludes = event.target.value.replace(/\s/g, '-');
    this.setState((prevState, props) => ({
      excludes: trimmedExcludes.split(','),
    }));
  };
  handleClearInclude = (event) => {
    this.setState((prevState, props) => ({
      includes: [],
    }));
  };

  handleClearExclude = (event) => {
    this.setState((prevState, props) => ({
      excludes: [],
    }));
  };

  render() {
    if (this.state.includes.length > 0 && this.state.excludes.length > 0) {
      this.setState((prevState, props) => ({
        includes: [],
        excludes: [],
      }));
    }

    return (
      <div style={{ width: '100%', flex: '1' }}>
        <Button onClick={this.handleClickOpen} color="primary">
          Ingredients
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleCancel}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Include/Exclude Ingredients</DialogTitle>
          <DialogContent>
            <DialogContentText>Separate ingredients by a single comma.</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="include"
              label="Include"
              fullWidth
              onFocus={event => this.handleClearInclude(event)}
              onChange={event => this.handleOnChangeIncludes(event)}
            />
            <TextField
              margin="dense"
              id="exclude"
              label="Exclude"
              fullWidth
              onFocus={event => this.handleClearExclude(event)}
              onChange={event => this.handleOnChangeExcludes(event)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSave} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
FilterDialog.propTypes = {
  handleIngredientsFilter: PropTypes.func.isRequired,
};

export default withStyles(styles)(FilterDialog);
