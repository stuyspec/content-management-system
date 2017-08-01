import * as t from './actionTypes'

export const fetchArticle = () => (
  dispatch => {
    axios.get(
      `${constants.STUY_SPEC_API_URL}/articles`
    )
  }
)
export const saveSelectedArticles = selectedArticles => ({
  type: t.SAVE_SELECTED_ARTICLES,
  payload: selectedArticles
})

export const deleteSelectedArticles = articleIds => ({
  type: t.DELETE_SELECTED_ARTICLES,
  payload: articleIds
})