/**
 * Created by nicholas on 6/24/17.
 */
import React from "react";
import Article from "./Article";
import injectSheet from "react-jss";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const ARTICLES_QUERY = gql`
  query ArticlesQuery {
    allArticles {
      title
      content
      section {
        name
      }
      contributors
    }
  }
`;

const styles = {
  articlesList: {
    listStyle: "none"
  },
  articlesListContainer: {
    padding: "5%"
  }
};

const ArticlesList = ({ classes, data }) => {
  console.log(data);
  return (
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
    </div>
  );
};
export default graphql(ARTICLES_QUERY)(injectSheet(styles)(ArticlesList));
