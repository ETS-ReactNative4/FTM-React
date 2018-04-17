import React, { Component } from 'react';
import { Grid, Card, List, ListItem, Typography } from 'material-ui';
import './RecipeIngredients.css';


class RecipeIngredients extends Component {
  /*
  displayItems = () => {
    let outer = [];
    let inner = [];
    outer.push(<Grid>what</Grid>);
    for (let i = 0; i < ingredientList.length; i++) {
      inner.push(<ListItem>{ingredientList[i]}</ListItem>);
    }
    return inner;
  }

  createTable = () => {
    let table = [];
    table.push(<h1>what</h1>);
    // Outer loop to create parent
    for (let i = 0; i < 3; i++) {
      let children = [];
      // Inner loop to create children
      for (let j = 0; j < 5; j++) {
        children.push(<td>{`Column ${j + 1}`}</td>);
        children.push(<td>what</td>);
      }
      // Create the parent and add the children
      table.push(<tr>{children}</tr>);
    }
    return (<table>{table}</table>);
  }
  */
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <div className="fullSize">
        <Card>
          <Typography component="p" className="ingredients-title">Ingredients</Typography>
          <List>
            {
              this.props.value.map((name, index) => {
                return <ListItem> {name} </ListItem>;
              })
            }
          </List>
        </Card>
      </div>
    );
  }
}

export default RecipeIngredients;
