import React, { Component } from 'react';
import { Card, Typography } from 'material-ui';
import './ProfileDescription.css';

class ProfileDescription extends Component {

  constructor(props) {
    super(props);
    this.state = {
      desc: null,
    };
  }

  render() {
    return (
      <div className="fullSize">
        <Card className="profile-description">
          <Typography>
            {this.props.desc}
          </Typography>
        </Card>
      </div>
    );
  }
}

export default ProfileDescription;
