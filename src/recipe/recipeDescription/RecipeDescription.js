import React, { Component } from 'react';
import { Card, Typography } from 'material-ui';
import './RecipeDescription.css';

class RecipeDescription extends Component {
  render() {
    return (
      <div className="fullSize">
        <Card className="recipe-description">
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi quam lacus, efficitur efficitur dictum ac, congue in augue.
            Donec et justo luctus, laoreet nunc vel, placerat lacus. Morbi in felis ut elit feugiat interdum nec non neque.
            Etiam eleifend libero at odio luctus, in finibus dui sollicitudin. Sed pulvinar tincidunt ex et molestie. Aliquam erat volutpat.
            Donec at mauris at risus venenatis luctus.
          </Typography>
        </Card>
      </div>
    );
  }
}

export default RecipeDescription;
