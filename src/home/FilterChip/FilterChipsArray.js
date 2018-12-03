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
    chipData: [],
  };

  handleAddFilterChip = (filterChip) => {
    const newChipData = this.state.chipData.slice();
    newChipData.push({ key: 0, label: filterChip });
    const updatedChipData = [];
    newChipData.forEach((chip, index) => {
      updatedChipData.push({ key: index, label: chip.label });
    });
    this.setState({ chipData: updatedChipData });
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
