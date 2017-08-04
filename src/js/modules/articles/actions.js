import * as t from './actionTypes'
import { STUY_SPEC_API_URL, AXIOS_CONFIG } from '../../constants'
import axios from 'axios'

export const fetchArticles = () => (
  dispatch => {
    dispatch({
      type: t.FETCH_ARTICLES_REQUESTED
    })
    axios.get(
      `${STUY_SPEC_API_URL}/articles`,
      AXIOS_CONFIG
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

export const setSelectedArticles = selectedArticles => ({
  type: t.SET_SELECTED_ARTICLES,
  payload: selectedArticles
})


export const deleteArticles = articleSlugs => (
  dispatch => {
    dispatch({
      type: t.DELETE_ARTICLES_REQUESTED
    })
    axios
    .all(

      articleSlugs.map(articleSlug =>
        axios.delete(
          `${STUY_SPEC_API_URL}/articles/${articleSlug}`
        )
      )
    )
    .then(response => dispatch({
      type: t.DELETE_ARTICLES_SUCCEEDED,
      payload: articleSlugs
      })
    )
    .catch(error => dispatch({
      type: t.DELETE_ARTICLES_FAILED,
      payload: error
      })
    )
  }
)