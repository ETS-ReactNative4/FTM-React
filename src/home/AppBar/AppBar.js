import React, { Fragment } from 'react';
import {
  Typography,
  AppBar,
  Toolbar,
  Button,
  withStyles,
  Avatar,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { compose, withApollo } from 'react-apollo';
import withLocalData from '../../withLocalData';

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
  const { classes, token } = props;
  console.log(token);
  return (
    <div className={classes.root}>
      <AppBar id="main-app-bar" position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            color="inherit"
            className={classes.flex}
            style={{ textDecoration: 'none' }}
            component={Link}
            to="/"
          >
            FoodtoMake
          </Typography>
          {token ? (
            <Fragment>
              <Avatar
                aria-label="Result"
                className={classes.avatar}
                src="http://i65.tinypic.com/2rnvc7k.png"
                component={Link}
                to="/profile"
              />
              <Button color="inherit" component={Link} to="/signout">
                Sign Out
              </Button>
            </Fragment>
          ) : (
            <Fragment>
              <Button color="inherit" component={Link} to="/signup">
                Sign Up
              </Button>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default compose(
  withLocalData,
  withApollo,
  withStyles(styles),
)(HomeAppBar);
