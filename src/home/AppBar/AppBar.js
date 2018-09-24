import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Avatar } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { compose, graphql } from 'react-apollo';
import { getToken } from '../../graphql/queries';

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
            variant="title"
            color="inherit"
            className={classes.flex}
            style={{ textDecoration: 'none' }}
            component={Link}
            to="/"
          >
            FoodtoMake
          </Typography>
          {!token && (
            <Button color="inherit" component={Link} to="/signup">
              Sign Up
            </Button>
          )}
          {!token && (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
          {token && (
            <Avatar
              aria-label="Result"
              className={classes.avatar}
              src="https://i.imgur.com/KWl6pqT.jpg"
              component={Link}
              to="/profile"
            />
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default compose(
  graphql(getToken, {
    props: ({ data: { token } }) => ({ token }),
  }),
  withStyles(styles),
)(HomeAppBar);
