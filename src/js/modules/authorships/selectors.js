/**
 * Created by nicholas on 8/4/17.
 */
import { createSelector } from "reselect";
import { getSelectedArticles } from "../articles/selectors";
import { usersSelector } from "../users/selectors";

export const getAuthorships = state => state.authorships.list;

// Returns object with the format articleId:[users]
export const getContributorsByArticle = createSelector(
  getAuthorships,
  getSelectedArticles,
  usersSelector,
  (authorships, articles, users) => {
    let contributors = {};
    // For every articles...
    articles.map(article => {
      // Find the authorships corresponding to that articles
      const articleAuthorships = authorships.filter(
        authorship => authorship.articleId === article.id
      );
      // Then find the users in those authorships
      const articleContributors = articleAuthorships.map(authorship =>
        users.find(user => authorship.userId === user.id)
      );
      // Finally add it to an object under the articleId
      // Jesus, this is inefficient. Thank god for memoizatio
      contributors[article.id] = articleContributors;
    });
    return contributors;
  }
);

export const getSelectedArticlesWithContributors = createSelector(
  getSelectedArticles,
  getAuthorships,
  (articles, authorships) =>
    articles.map(article => {
      const contributors = authorships
      .filter(authorship => authorship.articleId === article.id)
      .map(authorship => authorship.userId);
      return { ...article, contributors };
    })
);