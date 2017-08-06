import React from "react";
import injectSheet from "react-jss";
const styles = {
  article: {
    fontSize: "1em",
  },
  articleTitle: {
    fontSize: "1em",
  },
};

const Article = ({ classes, title, contributors, content, department }) =>
  <div className={classes.article}>
    <h3 className={classes.articleTitle}>
      {" "}{title}{" "}
    </h3>
    <i> { department } </i>
      {" "}{contributors}{" "}
    <p dangerouslySetInnerHTML={{ __html: content}}>
    </p>
  </div>;

export default injectSheet(styles)(Article);
