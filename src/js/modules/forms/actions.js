import * as t from "./actionTypes";
import { usersSelector } from "./../users/selectors";
// TODO: Change endpoint storage to outside code
import { STUY_SPEC_API_URL } from "../../constants";
import axios from "axios";
import { push } from "connected-react-router";

export const addContributor = contributorName => (dispatch, getState) => {
  const users = usersSelector(getState());
  const contributor = users.find(user => user.name === contributorName);
  const contributorId = contributor.id;

  dispatch({
    type: t.ADD_CONTRIBUTOR,
    payload: { contributorId }
  });
};

export const removeContributor = contributorId => ({
  type: t.REMOVE_CONTRIBUTOR,
  payload: { contributorId }
});

export const saveArticleData = (title, content, section) => ({
  type: t.SAVE_ARTICLE_DATA,
  payload: { title, content, section }
});

export const createArticle = article => dispatch => {
  axios
    .post(`${STUY_SPEC_API_URL}/articles`, article)
    .then(response => {
      dispatch(push("/"));
    })
    .catch(error => console.error("Post failed"));
};

export const createSection = section => dispatch => {
  dispatch({
    type: t.CREATE_SECTION_REQUESTED
  });
  axios
    .post(`${STUY_SPEC_API_URL}/sections`, section)
    .then(response => {
      dispatch({
        type: t.CREATE_SECTION_SUCCEEDED,
        payload: section
      });
      dispatch(push("/"));
    })
    .catch(error => {
      dispatch({
        type: t.CREATE_SECTION_FAILED,
        payload: error
      });
    });
};
