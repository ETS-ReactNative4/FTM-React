import React, { Component } from 'react';
import { Paper, Checkbox, List, ListItem } from 'material-ui';
import './RecipeIngredients.css';

class RecipeIngredients extends Component {
  render() {
    return (
      <div className="fullSize">
        <Paper rounded='false' className="fullSize">
          <List>
            <ListItem leftcheckbox={<Checkbox/>}>Item 1</ListItem>
            <ListItem leftcheckbox={<Checkbox/>}>Item 2</ListItem>
            <ListItem leftcheckbox={<Checkbox/>}>Item 3</ListItem>
            <ListItem leftcheckbox={<Checkbox/>}>Item 4</ListItem>
            <ListItem leftcheckbox={<Checkbox/>}>Item 5</ListItem>
          </List>
        </Paper>
      </div>
    );
  }
}

export default RecipeIngredients;
