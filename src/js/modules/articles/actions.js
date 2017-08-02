import * as t from './actionTypes'
import { STUY_SPEC_API_URL } from '../../constants'
import axios from 'axios'

export const fetchArticles = () => (
  dispatch => {
    dispatch({
      type: t.FETCH_ARTICLES_REQUESTED
    })
    axios.get(
      `${STUY_SPEC_API_URL}/articles`
    )
    .then(response => {
      dispatch({
        type: t.FETCH_ARTICLES_SUCCEEDED,
        payload: response.data
      })
    })
    .catch(error => {
      dispatch({
        type: t.FETCH_ARTICLES_FAILED,
        payload: error
      })
    })
  }
)

export const saveSelectedArticles = selectedArticles => ({
  type: t.SAVE_SELECTED_ARTICLES,
  payload: selectedArticles
})

export const deleteArticles = articleIds => (
  dispatch => {
    dispatch({
      type: t.DELETE_ARTICLES_REQUESTED
    })
    axios
    .all(
      articleIds.map(articleId =>
        axios.delete(
          `${STUY_SPEC_API_URL}/articles/${articleId}`
        )
      )
    )
    .then(response => dispatch({
      type: t.DELETE_ARTICLES_SUCCEEDED,
      payload: articleIds
      })
    )
    .catch(error => dispatch({
      type: t.DELETE_ARTICLES_FAILED,
      payload: error
      })
    )
  }
)