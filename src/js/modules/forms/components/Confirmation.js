import React, { Component }   from "react";
import { createArticle }      from './../actions';
import injectSheet            from 'react-jss';
import ArticleEditor from "./ArticleEditor";
import ContributorsList       from './ContributorsList';
import ContributorsInput      from "./EditorInputs/ContributorsInput";

const styles = {
  title: {
    textAlign: 'center',
    fontFamily: "Roboto, sans-serif",
    paddingTop: '30px',
  },
  text: {
    paddingTop: '20px',
    textAlign: 'center',
  },
  minionImage: {
    display: 'block',
    margin: '0 auto',
    paddingTop: '30px',
  }
}

class Confirmation extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
      <h1 className={classes.title}> Confirmation Page </h1>
      <h3 className={classes.text}>Your article has been submitted.</h3>
        <img src="http://diysolarpanelsv.com/images/bob-the-minion-clipart-transparent-background-38.gif" alt="Minion"
        height="80%" width="80%" className={classes.minionImage}></img>
      </div>
    );
  }
}

export default injectSheet(styles)(Confirmation);
