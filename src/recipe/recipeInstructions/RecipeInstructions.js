import React, { Component } from 'react';
import { Card, Grid, List, ListItem, ListItemText, Checkbox, Typography } from 'material-ui';
import './RecipeInstructions.css';

const styles = {
  spacing: 24,
  sizes: {
    xs: {
      instructions: 8,
    },
    sm: {
      instructions: 8,
    },
  },
};

class RecipeInstructions extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <Card>
        <Typography className="instructions-title"> Directions </Typography>
        <Grid item>
          <List className="instructions-list">
            {
              this.props.value.map((name) => {
                return <ListItem key={name.id}><Checkbox />{name}</ListItem>;
              })
            }
          </List>
        </Grid>
      </Card>
    );
  }
}

export default RecipeInstructions;
