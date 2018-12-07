import React, { Component } from 'react';
import { withApollo, Mutation, compose } from 'react-apollo';
import gql from 'graphql-tag';
import './ProfilePicture.css';
import withLocalData from '../../withLocalData';

class ProfilePicture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageURL: null,
      name: null
    };

    this.uploadFile = this.uploadFile.bind(this);
  }

  uploadFile = async photos => {
    const { client, userId } = this.props;
    const data = {
      image: photos
    };
    const u_id = userId;
    console.log('new profile photo ', data.image);
    console.log('u_id: ', u_id);
    client
      .mutate({
        mutation: gql`
          mutation UpdateUser(
            $userId: String!
            $userUpdates: UpdateUserInput!
          ) {
            updateUser(userId: $userId, userUpdates: $userUpdates) {
              id
              profilePicture
            }
          }
        `,
        variables: {
          userUpdates: {
            profilePicture: data.image[0]
          },
          userId: u_id
        }
      })
      .then(result => {
        console.log('uploaded photo: ', result.data);
        this.setState({ imageURL: result.data.updateUser.profilePicture });
      })
      .catch(err => {
        console.log('failed to upload photo, err: ');
        console.log(err);
      });
  };

  UPLOAD_FILE = gql`
    mutation UploadPhoto($file: Upload!) {
      uploadPhoto(file: $file)
    }
  `;

  render() {
    return (
      <div className="fullSize user-info">
        <img alt="user" src={this.props.imageURL} className="profile-pic" />
        <div className="upload-profile">
          <Mutation mutation={this.UPLOAD_FILE}>
            {uploadFile => (
              <input
                type="file"
                accept="image/jpg, image/jpeg, image/png"
                className="upload-pic"
                required
                onChange={({ target: { validity, files } }) => {
                  validity.valid && this.uploadFile(files);
                }}
              />
            )}
          </Mutation>
        </div>

        <div className="info">
          <div className="username">
            <span>{this.props.name}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  withLocalData,
  withApollo
)(ProfilePicture);
