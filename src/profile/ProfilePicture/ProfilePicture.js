import React, { Component } from 'react';
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
      <div className='fullSize user-info'>

        <img
          alt="user image"
          src={this.props.imageURL}
          className='profile-pic'
        />

        <div className="info">
          <div className="username">
            <span>{this.props.name}</span>
          </div>
          <div className="location">
            <span>San Diego, California</span>
          </div>
          <div className="blog">
            <a href="http://www.foodtomake.com">foodtomake</a>
          </div>
        </div>

      </div>
    );
  }
}

export default ProfilePicture;
