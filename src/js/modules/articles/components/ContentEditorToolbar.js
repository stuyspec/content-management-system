import React from "react";
import { RichUtils } from "draft-js";

const ContentEditorToolbar = ({ classes, handleChange, editorState }) => {
  const handleStyleChange = style => {
    handleChange(RichUtils.toggleInlineStyle(editorState, style));
  }
  const handleBoldClick = event => {
    event.preventDefault();
    handleStyleChange("BOLD")
  };

  const handleItalicClick = event => {
    event.preventDefault();
    handleStyleChange("ITALIC")
  }

  const handleUnderlineClick = event => {
    event.preventDefault();
    handleStyleChange("UNDERLINE");
  }

  return (
    <span className={classes.toolbar}>
      <button onClick={handleBoldClick}> Bold </button>
      <button onClick={handleItalicClick}> Italic </button>
      <button onClick={handleUnderlineClick}> Underline </button>
    </span>
  );
};


export default ContentEditorToolbar;