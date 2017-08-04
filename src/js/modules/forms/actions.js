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
  type: t.SAVE_ARTICLE_FORM_DATA,
  payload: { title, content, section }
});

export const createAuthorships = (contributors, article_id) => dispatch => {
  dispatch({
    type: t.CREATE_AUTHORSHIPS_REQUESTED
  })
  axios.all(
    contributors.map(
      contributor =>
        axios.post(`${STUY_SPEC_API_URL}/authorships`, {
          article_id,
          user_id: contributor
        })
    )
  )
  .then(response => dispatch({
      type: t.CREATE_AUTHORSHIPS_SUCCEEDED
    })
  )
  .catch(error => dispatch({
    type: t.CREATE_AUTHORSHIPS_FAILED,
    payload: error
  }))
}

export const createArticle = ({ title,
                                content,
                                section,
                                contributors }) => dispatch => {
  // TODO: Create loading anims
  dispatch({
    type: t.CREATE_ARTICLE_REQUESTED
  });
  const article = { title, content, section }
  axios
    .post(`${STUY_SPEC_API_URL}/articles`, article)
    .then(response => {
      dispatch(createAuthorships(contributors, response.data.id));
      dispatch({
        type: t.CREATE_ARTICLE_SUCCEEDED,
        payload: article
      })
      dispatch(push('/'));
      dispatch({
        type: t.CLEAR_ARTICLE_FORM_DATA
      });
    })
    // TODO: Create error messages for requests
    .catch(error => {
      dispatch({
        type: t.CREATE_ARTICLE_FAILED,
        payload: error
      });
    })
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
