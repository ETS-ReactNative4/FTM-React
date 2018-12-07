import React, { Component } from 'react';
import { Avatar, Card, Chip, Input } from '@material-ui/core';
import TimerIcon from '@material-ui/icons/Timer';
import { Route } from 'react-router-dom';
import './Info.css';

const styles = {
  chip: {
    margin: 4
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  }
};

function handleClick() {
  alert('Possibly more information about this chip?');
}

/**
 * This is recipe author, tags, difficulty, cook time...
 */
class RecipeInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorImage: null,
      authorName: null,
      cookTime: null,
      prepTime: null,
      difficulty: null,
      tags: null
    };
  }

  render() {
    return (
      <Card className="recipeInfo">
        <div className="recipeAuthor">
          <Avatar src={this.props.authorImage} />
          <Route
            render={({ history }) => (
              <span
                className="authorName"
                onClick={() => {
                  history.push(`/profile/${this.props.authorName}`);
                }}
              >
                {this.props.authorName}
              </span>
            )}
          />
          <span className="time">
            <TimerIcon /> Prep: {this.props.prepTime} mins
          </span>
          <span className="time">
            <TimerIcon /> Cook: {this.props.cookTime} mins
          </span>
          <span className="difficulty">
            Difficulty: {this.props.difficulty}
          </span>
        </div>
        <div className="tags">
          <div style={styles.wrapper}>
            {this.props.tags.map((name, index) => {
              return (
                <Chip
                  key={index}
                  onClick={handleClick}
                  style={styles.chip}
                  className="chip"
                  label={name}
                />
              );
            })}
          </div>
        </div>
        <label htmlFor="servingsInput">Servings</label>
        <Input
          id="servingsInput"
          type="number"
          value={this.props.servings}
          onChange={this.props.onScaleChange}
        />
      </Card>
    );
  }
}

export default RecipeInfo;
