import React, { Component } from 'react';
import { Avatar, Card, Typography, Chip } from 'material-ui';
import './RecipeInfo.css';


const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

function handleClick() {
  alert('Possibly more information about this chip?');
}


/**
 * This is recipe author, tags, difficulty, cook time...
 */
class RecipeInfo extends Component {
  render() {
    return (
      <Card className="recipeInfo">
        <div className="recipeAuthor">
          <Avatar src="https://i.pinimg.com/originals/88/2d/88/882d883fcf289d704c064da27ed4fa60.png" /> Mario
          <Typography paragraph component="p" className="time">
            10 Hours!
          </Typography>
        </div>
        <div className="tags">
          <div style={styles.wrapper}>
            <Chip onClick={handleClick} style={styles.chip} className="chip" label="Tag 1" />
            <Chip onClick={handleClick} style={styles.chip} className="chip" label="Tag 2" />
          </div>
        </div>
      </Card>
    );
  }
}

export default RecipeInfo;
