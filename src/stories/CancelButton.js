import React from 'react';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core';
import red from '@material-ui/core/colors/red';

const styles = {
  root: {
    '&:hover': {
      backgroundColor: red[500]
    },
    borderColor: red[500]
  }
};

function CancelButton(props) {
  const { classes, onClick, text } = props;
  return (
    <Button className={classes.root} variant="outlined" onClick={onClick}>
      {text}
    </Button>
  );
}

export default withStyles(styles)(CancelButton);
