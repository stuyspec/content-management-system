/**
 * Created by nicholas on 7/5/17.
 */
import React from 'react'
import injectSheet from 'react-jss';
import CKEditor from "react-ckeditor-wrapper";

const styles = {
    ckeditor: {
      maxWidth: "1000px",
      paddingTop: "5%"
    },
};
const ContentInput = ({handleContentChange, content, classes}) => (
    <div className={classes.ckeditor}>
        <CKEditor
          value={content}
          onChange={handleContentChange}
        />
    </div>
)

export default injectSheet(styles)(ContentInput)