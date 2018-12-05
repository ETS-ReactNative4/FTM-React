import React, { Component } from 'react';

import { Card, Icon } from '@material-ui/core';
import '../Social.css';

class SocialButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      styleActive: false,
    };
  }

  toggleClass() {
    console.log('toggle class clicked');
    const currentState = this.state.styleActive;
    this.setState({ styleActive: !currentState });
  }

  render() {
    return (
      <Card className={this.props.classActive ? 'num-container btn-active' : 'num-container'} onClick={() => { this.props.delegateShowResults(this.props.delegateShow); this.toggleClass(); }}>
        <Icon>{this.props.icon}</Icon>
        <span className="number">{this.props.number}</span><br />
        <span>{this.props.title}</span>
      </Card>
    );
  }
}

export default SocialButton;