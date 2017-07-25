/**
 * Created by nicholas on 7/25/17.
 */
import { createSelector } from 'reselect'

export const articlesSelector = state => state.articles.list

export const articlesPreviewSelector = createSelector(
  articlesSelector,
  articles => (
    articles.map(
      article => {
        const content = article.content
        const lastWordIndex = content.indexOf('</p>') + 4
        return {
          ...article,
          content: content.substring(0, lastWordIndex)
        }
      }
    )
  )
)