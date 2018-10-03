import React from 'react';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

const styles = theme => ({
  root: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700]
    }
  }
});

function DeleteButton(props) {
  const { classes, text } = props;
  return (
    <Button className={classes.root} variant="contained">
      {text}
    </Button>
  );
}

export default withStyles(styles)(DeleteButton);
