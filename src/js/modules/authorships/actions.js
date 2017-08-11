/**
 * Created by nicholas on 8/4/17.
 */

import * as t from './actionTypes'
import { STUY_SPEC_API_URL, AXIOS_CONFIG } from '../../constants'
import axios from 'axios'

export const fetchAuthorships = () => (
  dispatch => {
    dispatch({
      type: t.FETCH_AUTHORSHIPS_REQUESTED
    })
    axios.get(
      `${STUY_SPEC_API_URL}/authorships`,
      AXIOS_CONFIG
    )
    .then(response => {
      dispatch({
        type: t.FETCH_AUTHORSHIPS_SUCCEEDED,
        payload: response.data
      })
    })
    .catch(error => {
      dispatch({
        type: t.FETCH_AUTHORSHIPS_FAILED,
        payload: error
      })
    })
  }
)

export const createAuthorships = (contributors, articleId) => dispatch => {
  dispatch({
    type: t.CREATE_AUTHORSHIPS_REQUESTED,
    payload: {
      contributors,
      articleId
    }
  });
  return axios
  .all(
    contributors.map(contributor =>
      axios.post(`${STUY_SPEC_API_URL}/authorships`, {
        article_id: articleId,
        user_id: contributor.id
      })
    )
  )
  .then(response => {
    return dispatch({
      type: t.CREATE_AUTHORSHIPS_SUCCEEDED,
      payload: response
    });
  })
  .catch(error =>
    dispatch({
      type: t.CREATE_AUTHORSHIPS_FAILED,
      payload: {
        error,
        articleId
      }
    })
  );
};

