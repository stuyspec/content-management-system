import * as t from './actionTypes'
import { STUY_SPEC_API_URL } from '../../constants'
import axios from 'axios'

export const fetchSections = () => (
  dispatch => {
    console.log(`${STUY_SPEC_API_URL}/sections`);
    axios.get(
      `${STUY_SPEC_API_URL}/sections`
    )
    .then(response => {
      dispatch({
          type: t.FETCH_SECTIONS_SUCCEEDED,
          payload: response.data
        })
      }
    )
    .catch(error => {
      dispatch({
          type: t.FETCH_SECTIONS_FAILED,
          payload: error
        })
      }
    )
  }
)