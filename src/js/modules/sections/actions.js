import * as t from './actionTypes'
import { STUY_SPEC_API_URL, AXIOS_CONFIG } from '../../constants'
import axios from 'axios'

export const fetchSections = () => (
  dispatch => {
    // Start loading icon
    dispatch({
      type: t.FETCH_SECTIONS_REQUESTED,
    })
    axios.get(
      `${STUY_SPEC_API_URL}/sections`, AXIOS_CONFIG
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

export const createSection = section => dispatch => {
  // TODO: Create loading anims
  dispatch({
    type: t.CREATE_SECTION_REQUESTED,
    payload: section
  });
  axios
  .post(`${STUY_SPEC_API_URL}/sections`, section, AXIOS_CONFIG)
  .then(response => {
    dispatch({
      type: t.CREATE_SECTION_SUCCEEDED,
      payload: response.data
    });
    dispatch(push("/"));
  })
  // TODO: Create error messages for requests
  .catch(error => {
    dispatch({
      type: t.CREATE_SECTION_FAILED,
      payload: error
    });
  });
};
