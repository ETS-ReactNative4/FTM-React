import React, { Component } from 'react';
import { Card, Typography } from 'material-ui';
import './Description.css';

class RecipeDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      desc: null,
    };
  }

  render() {
    return (
      <div className="fullSize">
        <Card className="recipe-description">
          <Typography>
            {this.props.desc}
          </Typography>
        </Card>
      </div>
    );
  }
}

export default RecipeDescription;
