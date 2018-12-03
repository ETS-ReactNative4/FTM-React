import React from 'react';
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

class FilterDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSave = () => {};

  render() {
    return (
      <div style={{ width: '100%', flex: '1' }}>
        <Button onClick={this.handleClickOpen} color="primary">
          Ingredients
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Include/Exclude Ingredients</DialogTitle>
          <DialogContent>
            <DialogContentText>Separate ingredients by white space.</DialogContentText>
            <TextField autoFocus margin="dense" id="include" label="Include" fullWidth />
            <TextField margin="dense" id="exclude" label="Exclude" fullWidth />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(FilterDialog);
