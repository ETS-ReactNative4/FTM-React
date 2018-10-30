import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Avatar,
  CardHeader,
  IconButton,
  CardMedia,
} from '@material-ui/core';
import { Favorite, Share, MoreVert } from '@material-ui/icons';
import { Route } from 'react-router-dom';
import './SearchResult.css';

const styles = {
  card: {
    height: 350,
    width: 250,
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
    margin: 10,
    width: 45,
    height: 45,
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
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

  render() {
    const {
 classes, name, r_id, description, created, images 
} = this.props;

    return (
      <Route
        render={({ history }) => (
          <Card
            className={classes.card}
            onClick={() => {
              history.push(`/recipe/${r_id}`);
            }}
          >
            <CardHeader
              avatar={
                <Avatar
                  aria-label="Result"
                  className={classes.avatar}
                  src="https://i.imgur.com/KWl6pqT.jpg"
                />
              }
              title={name}
              subheader={created}
            />
            <CardMedia
              className={classes.media}
              image={images}
              title="Fat cat alert"
            />
            <CardContent>
              <Typography component="p">{description}</Typography>
            </CardContent>
          </Card>
        )}
      />
    );
  }
}

export default withStyles(styles)(SearchResult);
