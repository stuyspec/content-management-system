/**
 * Created by nicholas on 7/25/17.
 */
import { createSelector } from 'reselect'
import { usersSelector } from '../users/selectors'

export const articlesSelector = state => state.articles.list

export const articlesPreviewSelector = createSelector(
  articlesSelector,
  articles => (
    articles.map(
      article => {
        const content = article.content
        // TODO: Make this more scientific on picking preview
        let contentPreview;
        if (content) {
          const lastWordIndex = content.indexOf('</p>') + 4
          contentPreview = content.substring(0, lastWordIndex)
        }
        else {
          contentPreview = "Blank"
        }
        return {
          ...article,
          content: contentPreview,
        }
      }
    )
  )
)

// For fun
export const randomArticleSelector = createSelector(
  articlesSelector,
  articles => (
    articles[Math.floor(Math.random() * articles.length)]
  )
)

let createArticle = {};
createArticle.contributorsSelector = state =>
  state.articles.forms.create.contributors;

createArticle.contributorsUsersSelector = createSelector(
  usersSelector,
  createArticle.contributorsSelector,
  (users, contributors) =>
    users.filter(user => contributors.includes(user.id))
);


createArticle.availableUsersSelector = createSelector(
  usersSelector,
  createArticle.contributorsSelector,
  (users, contributors) => {
    return users.filter(user => !contributors.includes(user.id))
  }
);

createArticle.availableUsersNamesSelector = createSelector(
  createArticle.availableUsersSelector,
  availableUsers => (
    availableUsers.map(user => user.name)
  )
);

export { createArticle };


let editArticle = {};
editArticle.contributorsSelector = state =>
  state.articles.forms.edit.contributors;

editArticle.contributorsUsersSelector = createSelector(
  usersSelector,
  editArticle.contributorsSelector,
  (users, contributors) =>
    users.filter(user => contributors.includes(user.id))
);


editArticle.availableUsersSelector = createSelector(
  usersSelector,
  editArticle.contributorsSelector,
  (users, contributors) => {
    return users.filter(user => !contributors.includes(user.id))
  }
);

editArticle.availableUsersNamesSelector = createSelector(
  editArticle.availableUsersSelector,
  availableUsers => (
    availableUsers.map(user => user.name)
  )
);

export { editArticle };