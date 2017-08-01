/**
 * Created by nicholas on 7/25/17.
 */
import { createSelector } from 'reselect'

export const articlesSelector = state => state.list.list

export const articlesPreviewSelector = createSelector(
  articlesSelector,
  articles => (
    articles.map(
      article => {
        const content = article.content
        // TODO: Make this more scientific on picking preview
        const lastWordIndex = content.indexOf('</p>') + 4
        return {
          ...article,
          content: content.substring(0, lastWordIndex)
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