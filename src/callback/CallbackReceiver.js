import React, { Component } from 'react';
import Auth from '../auth/Auth';
import CallbackLogic from './CallbackLogic';
import Loading from '../loading/Loading';

const auth = new Auth();

class CallbackReceiver extends Component {
  state = {
    id: ''
  };

  async componentDidMount() {
    const id = await auth.handleAuthCallback();
    this.setState({ id });
  }

  render() {
    return (
      <div>
        {this.state.id ? (
          <CallbackLogic id={this.state.id} source={this.props.source} />
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

export default CallbackReceiver;
