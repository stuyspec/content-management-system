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

