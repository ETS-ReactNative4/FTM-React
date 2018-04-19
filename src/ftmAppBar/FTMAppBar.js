import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';

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

class MainDrawer extends React.Component {
  state = {
    left: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const sideList = (
      <div>
        <List><Link to="/recipe">Recipe</Link></List>
        <List>[1, 2, 3, 4, 5]</List>
        <Divider />
        <List>[test2]</List>
      </div>
    );

    return (
      <div>
        <MenuIcon onClick={this.toggleDrawer('left', true)}>Open Menu</MenuIcon>
        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}>
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

function MainAppBar(props) {
  const { classes } = props;
  
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MainDrawer />
          </IconButton>
          <Typography 
            variant="title" 
            color="inherit" 
            className={classes.flex} 
            style={{ textDecoration: 'none' }}
            component={Link} to="/">
            FoodtoMake
          </Typography>
          <Button color="inherit" component={Link} to="/login">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

MainAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainAppBar);