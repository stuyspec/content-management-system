import * as t from './actionTypes'

export const createArticle = article => ({
  type: t.CREATE_ARTICLE,
  payload: article
})

export const saveSelectedArticles = selectedArticles => ({
  type: t.SAVE_SELECTED_ARTICLES,
  payload: selectedArticles
})

export const deleteSelectedArticles = articleIds => ({
  type: t.DELETE_SELECTED_ARTICLES,
  payload: articleIds
})