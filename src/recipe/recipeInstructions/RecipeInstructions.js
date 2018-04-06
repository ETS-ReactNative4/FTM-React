import React, { Component } from 'react';
import { Card, Grid, List, ListItem, ListItemText, Checkbox } from 'material-ui';
import './RecipeInstructions.css';

const styles = {
  spacing: 24,
  sizes: {
    xs: {
      picture: 8,
      description: 8,
      ingredients: 8,
      instructions: 8,
    },
    sm: {
      picture: 4,
      description: 4,
      ingredients: 8,
      instructions: 8,
    },
  },
};

class RecipeInstructions extends Component {
  render() {
    return (
      <Card>
        <Grid container spacing={styles.spacing} justify={'center'}>
          <Grid item xs={8} sm={3}>
            <List>
              <ListItem><Checkbox/><ListItemText primary='Hello'/></ListItem>
            </List>
          </Grid>
        </Grid>
      </Card>
    );
  }
}

export default RecipeInstructions;
