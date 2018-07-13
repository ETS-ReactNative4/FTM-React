import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginRight: 20,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

function HomeAppBar(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar id="main-app-bar" position="fixed">
        <Toolbar>
          <Typography
            variant="title"
            color="inherit"
            className={classes.flex}
            style={{ textDecoration: 'none' }}
            component={Link} to="/">
            FoodtoMake
          </Typography>
          <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
          <Button color="inherit" component={Link} to="/login">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

HomeAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeAppBar);
