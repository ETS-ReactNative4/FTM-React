import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './SearchResult.css';

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: '',
    };
  }

  static get propTypes() {
    return {
      recipes: PropTypes.any,
    };
  }

  handleClick = (tile) => {
    tile.defaultPrevented();
  
  }

  render() {
    const styles = theme => ({
      root: {
        display: 'none',
        flexWrap: 'wrap',
        justifyContent: 'center',
        flexDirection: 'column',
        overflow: 'hidden',
        alignContent: 'center',
        padding: 25,
        maxWidth: 200,
        backgroundColor: theme.palette.background.paper,
      },
      gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      },
      tile: {
        width: '50px',
      },
      title: {
        color: theme.palette.primary.light,
      },
      titleBar: {
        background:
          'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
      },
    });

    if (this.props.recipes) {
      return (
        <GridList className={styles.gridList} cols={1}>
          {this.props.recipes.map(tile => (
            <GridListTile key={tile._id}
              className={styles.tile}
              onClick={ () => this.handleClick(tile) }
              style={{ cursor: 'pointer' }}
              component={Link} to={`/recipe/${tile.author}/${tile.name}`}>

              <img src={tile.images[0]} alt={tile.name} />
              <GridListTileBar
                title={tile.name}
                classes={{
                  root: styles.titleBar,
                  title: styles.title,
                }}
                actionIcon={
                  <IconButton>
                    <StarBorderIcon className={styles.title} />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      );
    }
    return (
      <div className="container">
        <Paper elevation={4}>
          <Typography className="form" variant="headline" component="h3">
          Result
          </Typography>
          <img
            src="https://i.imgur.com/4AiXzf8.jpg"
            alt="this is money cat" />
          <div>
            result:
          </div>
          <Typography className="form" component="p">
          Form
          </Typography>
        </Paper>
      </div>
    );
  }
}

SearchResult.defaultProps = {
  recipes: [],
};

export default SearchResult;

