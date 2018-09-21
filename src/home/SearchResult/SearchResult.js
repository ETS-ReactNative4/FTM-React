import React from 'react';
import PropTypes from 'prop-types';
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
import { Link } from 'react-router-dom';
import './SearchResult.css';

const styles = {
  card: {
    height: '100%',
    minHeight: 200,
    width: '100%',
    minWidth: 250,
    marginTop: 20,
    marginBottom: 20,
  },
  media: {
    height: 10,
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
      classes, name, r_id, description, created, images,
    } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="Result"
              className={classes.avatar}
              src="https://i.imgur.com/KWl6pqT.jpg"
            />
          }
          action={
            <IconButton>
              <MoreVert />
            </IconButton>
          }
          title={name}
          subheader={created}
        />
        <CardMedia className={classes.media} image={images[0]} title="Fat cat alert" />
        <CardContent>
          <Typography component="p">{description}</Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <Favorite />
          </IconButton>
          <IconButton aria-label="Share">
            <Share />
          </IconButton>
          <Button size="small" component={Link} to={`/recipe/${r_id}`}>
            Learn More
          </Button>
        </CardActions>
      </Card>
    );
  }
}

SearchResult.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
  r_id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default withStyles(styles)(SearchResult);
// function SearchResult(props) {
//   const { r_id } = props;
//   const { name } = props;
//   const { description } = props;
//   const { classes } = props;

//   // const location = {
//   //   pathname: '/recipe:',
//   //   state: { id: r_id }
//   // };

//   return (
//     // <Spring from={{ marginTop: 500, opacity: 0 }} to={{ marginTop: 20, opacity: 1 }}>
//     //   {({ opacity, marginTop }) => (
//     <Card className={classes.card}>
//       <CardContent>
//         <Typography variant="headline" component="h2">
//           {name}
//         </Typography>
//         <Typography component="p">
//           {description}
//           <br />
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <Button size="small" component={Link} to={`/recipe/${r_id}`}>
//           Learn More
//         </Button>
//       </CardActions>
//     </Card>
//     //   )}
//     // </Spring>
//   );
// }

// SearchResult.propTypes = {
//   name: PropTypes.string.isRequired,
//   description: PropTypes.string.isRequired,
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(SearchResult);
