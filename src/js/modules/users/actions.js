import * as t from "./actionTypes";
import axios from 'axios'
import { STUY_SPEC_API_URL, AXIOS_CONFIG } from '../../constants'

export const fetchUsers = () => (
  dispatch => {
    dispatch({
      type: t.FETCH_USERS_REQUESTED
    })
    axios.get(
      `${STUY_SPEC_API_URL}/users`,
      AXIOS_CONFIG
    )
    .then(response => {
      dispatch({
        type: t.FETCH_USERS_SUCCEEDED,
        payload: response.data
      })
    })
    .catch(error => {
      dispatch({
        type: t.FETCH_USERS_FAILED,
        payload: error
      })
    })
  }
)
