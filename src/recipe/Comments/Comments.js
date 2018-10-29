import React, { Component } from 'react';
import { Card, CardContent } from '@material-ui/core';
import './Comments.css';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: null,
    };
  }

  render() {
    return (
      <div className="comment-container">
        <h1 className="comments-title">Comments</h1>
        <div className="comment-card-placement">
          {
            this.props.comments.map((comment, index) => {
              return <Card className="comment-card" key={index}> <CardContent><h3>Author:</h3> {comment} </CardContent></Card>;
            })
          }
        </div>
      </div>
    );
  }
}

export default Comments;
