import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Avatar, CardHeader, CardMedia } from '@material-ui/core';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import './SearchResult.css';

const styles = {
  card: {
    height: 500,
    width: '33.333333%',
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    cursor: 'pointer',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  avatar: {
    margin: 5,
    width: 45,
    height: 45,
  },
  title: {
    marginBottom: 5,
    fontSize: 12,
  },
  pos: {
    marginBottom: 12,
  },
};
class SearchResult extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  truncateString = (des) => {
    console.log(des);
  };

  render() {
    const {
      classes, name, r_id, description, images,
    } = this.props;

    return (
      <Route
        render={({ history }) => (
          <Card
            className={classes.card}
            onClick={() => {
              // console.log(this.props);
              // history.push(`/recipe/${r_id}`);
            }}
          >
            <CardHeader
              avatar={
                <Avatar
                  alt={name}
                  className={classes.avatar}
                  src="http://i65.tinypic.com/2rnvc7k.png"
                />
              }
              title={name}
            />
            <CardMedia className={classes.media} image={images[0]} />
            <CardContent>
              <Typography className="recipe-description" component="p">
                {description}
              </Typography>
            </CardContent>
          </Card>
        )}
      />
    );
  }
}

SearchResult.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.any.isRequired,
  r_id: PropTypes.any.isRequired,
  description: PropTypes.any.isRequired,
  images: PropTypes.any.isRequired,
};

export default withStyles(styles)(SearchResult);
