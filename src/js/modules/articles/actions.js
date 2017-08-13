import * as t from './actionTypes'

export const createArticle = (article) => ({
  type: t.CREATE_ARTICLE,
  payload: article
})
