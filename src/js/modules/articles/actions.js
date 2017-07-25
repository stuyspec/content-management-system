import * as t from './actionTypes'

export const createArticle = article => ({
  type: t.CREATE_ARTICLE,
  payload: article
})

export const updateSelectedArticles = selectedArticles => ({
  type: t.UPDATE_SELECTED_ARTICLES,
  payload: selectedArticles
})