/**
 * Created by nicholas on 7/3/17.
 */
import React from "react";
import injectSheet from "react-jss";
import TextField from 'material-ui/TextField';


const styles = {
  inputWrapper: {
    wordSpacing: "10px",
    marginBottom: "10px"
  },

};

const ArticleTitleInput = ({ classes, onTitleChange, title }) => (
  <div className={classes.inputWrapper}>
    <TextField
      hintText="Title"
      value={title}
      onChange={onTitleChange}
    />
  </div>
);

export default injectSheet(styles)(ArticleTitleInput);
