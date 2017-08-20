/**
 * Created by nicholas on 7/3/17.
 */
import React from "react";
import TextField from 'material-ui/TextField';


const TitleInput = ({ handleTitleChange,
                      hintText,
                      title,
                      errorText }) => (
  <div>
    <TextField
      errorText={errorText}
      hintText={hintText}
      floatingLabelText="Title"
      value={title}
      onChange={handleTitleChange}
    />
  </div>
);

export default TitleInput;
