import React, { Component } from 'react';
import { Avatar, Card, Typography } from 'material-ui';
import './RecipeInfo.css';


/**
 * This is recipe author, tags, difficulty, cook time...
 */
class RecipeInfo extends Component {
  render() {
    return (
        <Card>
            <div className="recipeAuthor">
                <Avatar src="https://i.pinimg.com/originals/88/2d/88/882d883fcf289d704c064da27ed4fa60.png" /> Mario
            </div>
            <div className="cookTime">
                <Typography paragraph component="p">
                    10 Hours!
                </Typography>
            </div>
        </Card>
    );
  }
}

export default RecipeInfo;
