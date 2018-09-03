import React, { Component } from 'react';
import { Card, CardMedia } from 'material-ui';
import './ProfilePicture.css';

class ProfilePicture extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imageURL: null,
      name: null,
    };
  }

  render() {

    return (
      <div className="fullSize">
        <Card className="profile-pic">
          <CardMedia className="profile-picture" image={this.props.imageURL} alt="hello" />
          <div className="picture-name">
            <span>{this.props.name}</span>
          </div>
        </Card>
      </div>
    );
  }
}

export default ProfilePicture;
