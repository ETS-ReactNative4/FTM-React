import React, { Component } from 'react';

import { Card, Icon } from '@material-ui/core';
import './Social.css';

class Social extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owned_recipes_number: null,
      saved_recipes_number: null,
      made_this_number: null,
      following_number: null,
      my_profile: null,
    };
  }

  render() {
    console.log('my profile: ', this.state.my_profile);
    return (
      <div className='fullSize social-info'>

        <div className="info">
          <Card className="num-container owned-button" onClick={() => this.props.showResults('owned')}>
            <Icon>library_books</Icon>
            <span className="number">{this.props.owned_recipes_number}</span><br />
            <span>Owned Recipes</span>
          </Card>
          <Card className="num-container saved-button btn-active" onClick={() => this.props.showResults('saved')}>
            <Icon>library_books</Icon>
            <span className="number">{this.props.saved_recipes_number}</span><br />
            <span>Saved Recipes</span>
          </Card>
          <Card className="num-container madethis-button" onClick={() => this.props.showResults('madethis')}>
            <Icon>library_books</Icon>
            <span className="number">{this.props.made_this_number}</span><br />
            <span>I Made These!</span>
          </Card>
          {this.props.my_profile &&
            <Card className="num-container following-button" onClick={() => this.props.showResults('following')}>
              <Icon>people</Icon>
              <span className="number">{this.props.following_number}</span><br />
              <span>Following</span>
            </Card>
          }
          {!this.props.my_profile &&
            <Card className="num-container follow-button" onClick={() => this.props.followUser()}>
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
