import * as t from "./actionTypes";
import { usersSelector } from "./../users/selectors";
import { fetchAuthorships } from "../authorships/actions";
import { deleteArticles } from "../articles/actions"
// TODO: Change endpoint storage to outside code
import { STUY_SPEC_API_URL } from "../../constants";
import axios from "axios";
import { push } from "connected-react-router";

export const addContributorToCreateArticleForm = contributorName =>
  (dispatch, getState) => {
    const users = usersSelector(getState());
    const contributor = users.find(user => user.name === contributorName);
    const contributorId = contributor.id;

    dispatch({
      type: t.ADD_CONTRIBUTOR_TO_CREATE_ARTICLE_FORM,
      payload: { contributorId }
    });
  };

export const removeContributorFromCreateArticleForm = contributorId => ({
  type: t.REMOVE_CONTRIBUTOR_FROM_CREATE_ARTICLE_FORM,
  payload: { contributorId }
});

export const pushArticleOnEditStack =
  (title, content, section, articleId) => ({
    type: t.PUSH_ARTICLE_ON_EDIT_STACK,
    payload: { title, content, section, articleId }
});

export const popArticleOffEditStack = () => ({
  type: t.POP_ARTICLE_OFF_EDIT_STACK
})

export const saveArticleData = (title, content, section) => ({
  type: t.SAVE_ARTICLE_FORM_DATA,
  payload: { title, content, section}
})

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
        // Gotta get rid of the draft that autosaves
        dispatch({
          type: t.CLEAR_ARTICLE_FORM_DATA
        });
      }
      else {
        dispatch(fetchAuthorships());
        const articleId = response.payload.articleId
        dispatch(deleteArticles([articleId]))
      }
    });
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
