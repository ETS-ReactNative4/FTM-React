import React, { Component } from 'react';

import Icon from '@material-ui/core/Icon';
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
          <div className="recipe-num">
            <Icon>library_books</Icon>
            <span className="number">{this.props.recipes_number}</span><br />
            <span>Recipes</span>
          </div>
          <div className="follower-num">
            <Icon>people</Icon>
            <span className="number">{this.props.followers_number}</span><br />
            <span>Followers</span>
          </div>
          <div className="favorite-num">
            <Icon>star</Icon>
            <span className="number">{this.props.favorites_number}</span><br />
            <span>Favorites</span>
          </div>
        </div>

      </div>
    );
  }
}

export default Social;
