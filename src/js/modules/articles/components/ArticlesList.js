/**
 * Created by nicholas on 6/24/17.
 */
import React, { Component } from "react";
import Article from "./Article";
import injectSheet from "react-jss";
import { connect } from "react-redux";

const styles = {
  articlesList: {
    listStyle: "none"
  },
  articlesListContainer: {
    padding: "5%"
  }
};

const ArticlesList = ({ classes, articles }) =>
  <div className={classes.articlesListContainer}>
    <h2> Articles </h2>
    <ul className={classes.articlesList}>
      {articles.map(article =>
        <li key={`articleLI${article.id}`}>
          <Article
            title={article.title}
            content={article.content}
            department={article.department}
            contributors={article.contributors}
          />
        </li>
      )}
    </ul>
  </div>;

const mapStateToProps = state => ({
  articles: state.articles.list
});

export default connect(mapStateToProps, null)(
  injectSheet(styles)(ArticlesList)
);
