import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';

import './SearchResult.css';

const styles = {
  card: {
    minWidth: 811,
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

function SearchResultCard(props) {
  const { name } = props;
  const { description } = props;
  const { classes } = props;
  console.log(props);
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" />
        Recipe
        <Typography variant="headline" component="h2">
          {name}
        </Typography>
        <Typography component="p">
          {description}
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

SearchResultCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchResultCard);

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
