import * as t from "./actionTypes";
import { usersSelector } from "./../users/selectors";
import { fetchAuthorships } from "../articles/actions";
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
  type: t.SAVE_ARTICLE_FORM_DATA,
  payload: { title, content, section }
});

export const throwArticleError = error => ({
  type: t.THROW_ARTICLE_FORM_ERROR,
  payload: error
});

export const clearArticleError = () => ({
  type: t.CLEAR_ARTICLE_FORM_ERROR
});

export const submitArticleForm = ({
  title,
  content,
  section,
  contributors
}) => dispatch => {
  dispatch(createArticle({ title, content, section }))
    .then(response => {
      return dispatch(createAuthorships(contributors, response.data.id));
    })
    .then(response => {
      // Not very proud of this. Checking action type is a little messy
      // TODO: Change to something that fits better with promises
      if (response.type !== t.CREATE_AUTHORSHIPS_FAILED) {
        dispatch(push("/"));
        dispatch({
          type: t.CLEAR_ARTICLE_FORM_DATA
        });
      }
    });
};

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
          user_id: contributor
        })
      )
    )
    .then(response => {
      dispatch({
        type: t.CREATE_AUTHORSHIPS_SUCCEEDED,
        payload: response
      });
      dispatch(fetchAuthorships());
    })
    .catch(error =>
      dispatch({
        type: t.CREATE_AUTHORSHIPS_FAILED,
        payload: error
      })
    );
};

export const createArticle = ({ title, content, section }) => dispatch => {
  // TODO: Create loading anims
  dispatch({
    type: t.CREATE_ARTICLE_REQUESTED
  });
  const article = { title, content, section };
  return (
    axios
      .post(`${STUY_SPEC_API_URL}/articles`, article)
      .then(response => {
        dispatch({
          type: t.CREATE_ARTICLE_SUCCEEDED,
          payload: article
        });
        return response;
      })
      // TODO: Create error messages for requests
      .catch(error => {
        dispatch({
          type: t.CREATE_ARTICLE_FAILED,
          payload: error
        });
      })
  );
};

export const createSection = section => dispatch => {
  // TODO: Create loading anims
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
    // TODO: Create error messages for requests
    .catch(error => {
      dispatch({
        type: t.CREATE_SECTION_FAILED,
        payload: error
      });
    });
};
