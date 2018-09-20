import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import { Spring } from 'react-spring';
import { Link } from 'react-router-dom';
import './SearchResult.css';

const styles = {
  card: {
    minWidth: '100%',
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

function SearchResult(props) {
  const { r_id } = props;
  const { name } = props;
  const { description } = props;
  const { classes } = props;

  const location = {
    pathname: '/recipe:',
    state: { id: r_id },
  };

  return (
    // <Spring from={{ marginTop: 500, opacity: 0 }} to={{ marginTop: 20, opacity: 1 }}>
    //   {({ opacity, marginTop }) => (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="headline" component="h2">
          {name}
        </Typography>
        <Typography component="p">
          {description}
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to={`/recipe/${r_id}`}>
          Learn More
        </Button>
      </CardActions>
    </Card>
    //   )}
    // </Spring>
  );
}

SearchResult.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchResult);

// class HomeSearchResult extends Component {
//   static propTypes = {
//     name: PropTypes.string.isRequired,
//   };

//   render() {
//     const { name } = this.props.name;
//     return (
//       <Card>
//         <div className="search-root">
//           <div className="search-item">{name}</div>
//         </div>
//       </Card>
//     );
//   }
// }

// HomeSearchResult.defaultProps = {
//   recipes: {},
// };

// export default HomeSearchResult;
