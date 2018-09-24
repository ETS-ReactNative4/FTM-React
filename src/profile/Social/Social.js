import React, { Component } from 'react';

import { Card, Icon } from '@material-ui/core';
import './Social.css';

class Social extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owned_recipes_number: null,
      saved_recipes_number: null,
      followers_number: null,
    };
  }

  render() {
    return (
      <div className='fullSize social-info'>

        <div className="info">
          <Card className="recipe-num">
            <Icon>library_books</Icon>
            <span className="number">{this.props.owned_recipes_number}</span><br />
            <span>Owned Recipes</span>
          </Card>
          <Card className="follower-num">
            <Icon>library_books</Icon>
            <span className="number">{this.props.saved_recipes_number}</span><br />
            <span>Saved Recipes</span>
          </Card>
          <Card className="favorite-num">
            <Icon>people</Icon>
            <span className="number">{this.props.followers_number}</span><br />
            <span>Followers</span>
          </Card>
        </div>

      </div>
    );
  }
}

export default Social;
