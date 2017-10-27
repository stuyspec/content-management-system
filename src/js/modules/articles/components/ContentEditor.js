import React, { Component } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import injectSheet from "react-jss";
import ContentEditorToolbar from "./ContentEditorToolbar"

const styles = {
  contentEditorWrapper: {
    padding: "50px"
  },
  contentEditor: {
    borderStyle: "solid",
    borderWidth: "1px",
    maxWidth: "600px",
    padding: "20px"
  },
  toolbar: {
    padding: "10px"
  }
};

class ContentEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
  }
  handleChange = editorState => {
    this.setState({ editorState });
  };

  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      // Update state
      this.handleChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  render() {
    const { classes } = this.props;
    const { editorState } = this.state;
    return (
      <div className={classes.contentEditorWrapper}>
        <ContentEditorToolbar
          editorState={editorState}
          classes={classes}
          handleChange={this.handleChange}
        />
        <div className={classes.contentEditor}>
          <Editor
            editorState={editorState}
            onChange={this.handleChange}
            handleKeyCommand={this.handleKeyCommand}
          />
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(ContentEditor);
