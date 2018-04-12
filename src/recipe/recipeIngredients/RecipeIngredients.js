import React, { Component } from 'react';
import { Card, Checkbox, List, ListItem, Typography } from 'material-ui';
import './RecipeIngredients.css';

const ingredientList = new Array(5);
let i;
for (i = 0; i < ingredientList.length; i++) {
  ingredientList[i] = "Item " + i;
}


class RecipeIngredients extends Component {
  render() {
    return (
      <div className="fullSize">
        <Card>
          <Typography component="p" className="ingredients-title">Ingredients</Typography>
          <List>
            {ingredientList.map((name, index) => {
              return <ListItem> {name} </ListItem>;
            })}
          </List>
        </Card>
      </div>
    );
  }
}

export default RecipeIngredients;
