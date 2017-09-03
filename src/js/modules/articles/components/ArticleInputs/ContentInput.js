/**
 * Created by nicholas on 7/5/17.
 */
import React, { Component } from 'react'
import ImageUploadButton from './ImageUploadButton';
import { Editor, createEditorState } from 'medium-draft';

class ContentInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      editorState: createEditorState() // for empty content
    };
    this.sideButtons = [{
      title: 'Image',
      component: ImageUploadButton,
    }];
  }

  handleChange = editorState => {
    this.setState({ editorState });
  }

  render() {
   return (<Editor
      ref="editor"
      editorState={this.state.editorState}
      onChange={this.handleChange}
      sideButtons={this.sideButtons}
    />);
  }
}

export default ContentInput