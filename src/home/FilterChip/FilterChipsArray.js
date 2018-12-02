import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Chip } from '@material-ui/core';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit / 2,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
});

class FilterChipsArray extends React.Component {
  state = {
    chipData: [
      { key: 0, label: 'One' },
      { key: 1, label: 'Two' },
      { key: 2, label: 'Three' },
      { key: 3, label: 'Four' },
      { key: 4, label: 'Five' },
      { key: 5, label: 'One' },
      { key: 6, label: 'Two' },
      { key: 7, label: 'Three' },
      { key: 8, label: 'Four' },
      { key: 9, label: 'Five' },
      { key: 10, label: 'One' },
      { key: 11, label: 'Two' },
      { key: 12, label: 'Three' },
      { key: 13, label: 'Four' },
      { key: 14, label: 'Five' },
    ],
  };

  handleDelete = data => () => {
    this.setState((state) => {
      const chipData = [...state.chipData];
      const chipToDelete = chipData.indexOf(data);
      chipData.splice(chipToDelete, 1);
      return { chipData };
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.state.chipData.map((data, index) => {
          return (
            <Chip
              key={data.key}
              label={data.label}
              onDelete={this.handleDelete(data)}
              className={classes.chip}
            />
          );
        })}
      </div>
    );
  }
}

FilterChipsArray.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FilterChipsArray);
