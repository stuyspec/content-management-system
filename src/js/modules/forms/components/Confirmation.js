import React, { Component }   from "react";
import { createArticle }      from './../actions';
import injectSheet            from 'react-jss';
import ArticleEditor from "./ArticleEditor";
import ContributorsList       from './ContributorsList';
import ContributorsInput      from "./EditorInputs/ContributorsInput";
import { Col, Grid, Row } from 'react-bootstrap/lib/';

const styles = {
  wrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridGap: '5px',
    gridAutoRows: 'minmax(50px, auto)',
  },
  title: {
    textAlign: 'center',
    fontFamily: "Roboto, sans-serif",
    paddingTop: '30px',
    gridColumn: '2/5',
    gridRow: '1'
  },
  text: {
    paddingTop: '20px',
    textAlign: 'center',
    gridColumn: '2/5',
    gridRow: '2',
  },
  minionImage: {
    display: 'block',
    margin: '0 auto',
    paddingTop: '30px',
    gridColumn: '2/5',
    gridRow: '3',
  }
}

class Confirmation extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.wrapper}>
      <h1 className={classes.title}> Confirmation Page </h1>
      <h3 className={classes.text}>Your article has been submitted.</h3>
        <img src="https://s-media-cache-ak0.pinimg.com/originals/36/b1/6c/36b16cc68bbbca07f1c37183112de693.gif" alt="Minion"
        height='400px' width='400px' className={classes.minionImage}></img>
      </div>
    );
  }
}

export default injectSheet(styles)(Confirmation);
