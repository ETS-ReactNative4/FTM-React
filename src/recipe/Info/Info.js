import React, { Component } from 'react';
import { Avatar, Card, Chip, Input } from '@material-ui/core';
import TimerIcon from '@material-ui/icons/Timer';
import { Route } from 'react-router-dom';
import './Info.css';

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
  constructor(props) {
    super(props);
    this.state = {
      authorImage: null,
      authorName: null,
      cookTime: null,
      prepTime: null,
      difficulty: null,
      tags: null,
    };
  }

  render() {
    return (
      <Card className="infoCard">
        <div className="infoRoot">
          <div className="infoColumn">
            <Avatar className="avatar" src={this.props.authorImage} />
            <Route
              render={({ history }) => (
                <div
                  className="authorName"
                  onClick={() => {
                    history.push(`/profile/${this.props.authorName}`);
                  }}
                >
                  {this.props.authorName}
                </div>
              )}
            />
          </div>

          <div className="infoColumn">
            <TimerIcon /> Prep: {this.props.prepTime} mins
          </div>
          <div className="infoColumn">
            <TimerIcon /> Cook: {this.props.cookTime} mins
          </div>
          <div className="infoColumn">Difficulty: {this.props.difficulty}</div>
          <div className="infoColumn">
            <label className="servingsLabel" htmlFor="servingsInput">
              Servings:
            </label>
            <Input
              className="servingsCounter"
              id="servingsInput"
              type="number"
              textAlign="center"
              value={this.props.servings}
              onChange={this.props.onScaleChange}
            />
          </div>
        </div>
      </Card>
    );
  }
}

export default RecipeInfo;
