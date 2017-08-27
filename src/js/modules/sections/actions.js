import axios from "axios";
import { push } from "connected-react-router";

import { STUY_SPEC_API_URL, AXIOS_CONFIG } from "../../constants";
import * as t from "./actionTypes";

export const fetchSections = () => (
  dispatch => {
    // Start loading icon
    dispatch({
      type: t.FETCH_SECTIONS_PENDING,
    });
    axios.get(
      `${STUY_SPEC_API_URL}/sections`, AXIOS_CONFIG
    )
    .then(response => {
      dispatch({
          type: t.FETCH_SECTIONS_FULFILLED,
          payload: response.data
        });
      }
    )
    .catch(error => {
      dispatch({
          type: t.FETCH_SECTIONS_REJECTED,
          payload: error
        });
      }
    );
  }
);

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
