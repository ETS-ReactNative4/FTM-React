import React, { Component } from 'react';
import { Paper } from 'material-ui';
import './RecipeDescription.css';

class RecipeDescription extends Component {
  render() {
    return (
      <div className="fullSize">
        <Paper rounded={false} className="fullSize">
          <p>
            Hello.
          </p>
        </Paper>
      </div>
    );
  }
}

export default RecipeDescription;
