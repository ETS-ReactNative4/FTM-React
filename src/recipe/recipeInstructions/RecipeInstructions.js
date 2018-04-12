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
  render() {
    return (
      <Card>
        <Typography className="directions-title"> Directions </Typography>
        <Grid item>
          <List>
            <ListItem><Checkbox/><ListItemText primary='1. This is the first instruction'/></ListItem>
          </List>
        </Grid>
      </Card>
    );
  }
}

export default RecipeInstructions;
