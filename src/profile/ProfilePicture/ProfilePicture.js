import React, { Component } from 'react';
import './ProfilePicture.css';

class ProfilePicture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageURL: null,
      name: null
    };
  }

  render() {
    return (
      <div className="fullSize user-info">
        <img alt="user" src={this.props.imageURL} className="profile-pic" />

        <div className="info">
          <div className="username">
            <span>{this.props.name}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfilePicture;
