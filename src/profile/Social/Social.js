import React, { Component } from 'react';

import { Card, Icon } from '@material-ui/core';
import './Social.css';

class Social extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes_number: null,
      followers_number: null,
      favorites_number: null,
    };
  }

  render() {
    return (
      <div className='fullSize social-info'>

        <div className="info">
          <Card className="recipe-num">
            <Icon>library_books</Icon>
            <span className="number">{this.props.recipes_number}</span><br />
            <span>Recipes</span>
          </Card>
          <Card className="follower-num">
            <Icon>people</Icon>
            <span className="number">{this.props.followers_number}</span><br />
            <span>Followers</span>
          </Card>
          <Card className="favorite-num">
            <Icon>star</Icon>
            <span className="number">{this.props.favorites_number}</span><br />
            <span>Favorites</span>
          </Card>
        </div>

      </div>
    );
  }
}

export default Social;
