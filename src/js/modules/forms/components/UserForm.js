/**
 * Created by nicholas on 8/4/17.
 */
import React, { Component } from 'react'
import AvatarEditor from 'react-avatar-editor'

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePictureURL: ""
    }
  }

  render() {
    return (
      <div>
      <AvatarEditor
        image={this.state.profilePictureURL}
      />
      </div>
    )
  }
}

export default UserForm;