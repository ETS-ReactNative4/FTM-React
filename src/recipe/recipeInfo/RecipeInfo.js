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

  constructor(props) {
    super(props);
    this.state = {
      authorImage: null,
      authorName: null,
      time: null,
      difficulty: null,
      tags: null,
    };
  }

  render() {
    return (
      <Card className="recipeInfo">
        <div className="recipeAuthor">
          <Avatar src={this.props.authorImage} />
          <span className="authorName">{this.props.authorName}</span>
          <span className="time">{this.props.time}</span>
          <span className="difficulty">{this.props.difficulty}</span>
        </div>
        <div className="tags">
          <div style={styles.wrapper}>
            {
              this.props.tags.map((name) => {
                return <Chip onClick={handleClick} style={styles.chip} className="chip" label={name} />;
              })
            }
          </div>
        </div>
      </Card>
    );
  }
}

export default RecipeInfo;
