import React, { Component } from 'react';
import { Grid, Card, List, ListItem, Typography } from 'material-ui';
import './RecipeIngredients.css';

const ingredientList = new Array(6);
let i;
for (i = 0; i < ingredientList.length; i++) {
  ingredientList[i] = "Item " + i;
}

/*
function DisplayItems() {
  let i;
  const retVal = <Grid><List>;
  for (i = 0; i < ingredientList.length; i++) {
    if (i % 5 === 0) {
      retVal.concat(</List></Grid><Grid></List>);
    }
    retVal.concat(<ListItem>a</ListItem>);
  }
  retVal.concat(</List><Grid>);
  return retVal;
}
*/

class RecipeIngredients extends Component {

  createTable = () => {
    let table = [];

    // Outer loop to create parent
    for (let i = 0; i < 3; i++) {
      let children = [];
      // Inner loop to create children
      for (let j = 0; j < 5; j++) {
        children.push(<td>{`Column ${j + 1}`}</td>);
      }
      // Create the parent and add the children
      table.push(<tr>{children}</tr>);
    }
    return table;
  }

  render() {
    return (
      <div className="fullSize">
        <Card>
          <Typography component="p" className="ingredients-title">Ingredients</Typography>
          <Grid>
            <List>
              {
                this.createTable()
              }
            </List>
          </Grid>
        </Card>
      </div>
    );
  }
}

export default RecipeIngredients;
