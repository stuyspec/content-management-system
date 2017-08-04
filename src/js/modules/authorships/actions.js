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

