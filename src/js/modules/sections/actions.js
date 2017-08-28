import * as t from "./actionTypes";
import { STUY_SPEC_API_URL, AXIOS_CONFIG } from "../../constants";
import axios from "axios";
import { push } from "connected-react-router";

export const fetchSections = () => dispatch => {
  // Start loading icon
  dispatch({
    type: t.FETCH_SECTIONS_REQUESTED
  });
  axios
    .get(`${STUY_SPEC_API_URL}/sections`, AXIOS_CONFIG)
    .then(response => {
      dispatch({
        type: t.FETCH_SECTIONS_SUCCEEDED,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch({
        type: t.FETCH_SECTIONS_FAILED,
        payload: error
      });
    });
};

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
      dispatch(fetchSections());
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

export const deleteSections = sectionIds => dispatch => {
  dispatch({
    type: t.DELETE_SECTIONS_REQUESTED
  });
  axios
    .all(
      sectionIds.map(sectionId =>
        axios.delete(`${STUY_SPEC_API_URL}/sections/${sectionId}`)
      )
    )
    .then(response => {
      dispatch({
        type: t.DELETE_SECTIONS_SUCCEEDED,
        payload: sectionIds
      });
      dispatch(fetchSections());
      }
    )
    .catch(error =>
      dispatch({
        type: t.DELETE_SECTIONS_FAILED,
        payload: error
      })
    );
};

export const setSelectedSections = sectionIds => ({
  type: t.SET_SELECTED_SECTIONS,
  payload: { sectionIds }
});