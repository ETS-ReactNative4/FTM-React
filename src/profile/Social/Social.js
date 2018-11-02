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
      my_profile: null,
    };
  }

  render() {
    console.log('my profile: ', this.state.my_profile);
    return (
      <div className='fullSize social-info'>

        <div className="info">
          <Card className="recipe-num" onClick={() => this.props.showResults('owned')}>
            <Icon>library_books</Icon>
            <span className="number">{this.props.owned_recipes_number}</span><br />
            <span>Owned Recipes</span>
          </Card>
          <Card className="follower-num" onClick={() => this.props.showResults('saved')}>
            <Icon>library_books</Icon>
            <span className="number">{this.props.saved_recipes_number}</span><br />
            <span>Saved Recipes</span>
          </Card>
          {this.props.my_profile &&
            <Card className="favorite-num" onClick={() => this.props.showResults('followers')}>
              <Icon>people</Icon>
              <span className="number">{this.props.followers_number}</span><br />
              <span>Followers</span>
            </Card>
          }
          {!this.props.my_profile &&
            <Card className="favorite-num" onClick={() => this.props.followUser()}>
              <Icon>people</Icon>
              <span>Follow this user</span><br />
            </Card>
          }
        </div>

      </div>
    );
  }
}

export default Social;
