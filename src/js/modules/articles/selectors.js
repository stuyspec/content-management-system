/**
 * Created by nicholas on 7/25/17.
 */
import { createSelector } from 'reselect'
import { usersSelector } from '../users/selectors'

export const articlesSelector = state => state.articles.list
export const authorshipsSelector = state => state.articles.authorships

export const articlesPreviewSelector = createSelector(
  articlesSelector,
  authorshipsSelector,
  (articles, authorships) => (
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

// Returns object with the
export const contributorsByArticle = createSelector(
  authorshipsSelector,
  articlesSelector,
  usersSelector,
  (authorships, articles, users) => {
    let contributors = {}
    // For every article...
    articles.map(article => {
      // Find the authorships corresponding to that article
      const articleAuthorships = authorships.filter(
        authorship => authorship.articleId === article.id
      )
      // Then find the users in those authorships
      const articleContributors = articleAuthorships.map(authorship =>
        users.find(
          user => authorship.userId === user.id
        )
      )
      // Finally add it to an object under the articleId
      // Jesus, this is inefficient. Thank god for memoizatio
      contributors[article.id] = articleContributors
    })
    return contributors;
  }
)