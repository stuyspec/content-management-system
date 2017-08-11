import * as t from './actionTypes'
import { CREATE_AUTHORSHIPS_FAILED } from '../authorships/actionTypes'
import { STUY_SPEC_API_URL, AXIOS_CONFIG } from '../../constants'
import axios from 'axios'
import { usersSelector } from '../users/selectors'
import { createAuthorships, fetchAuthorships } from '../authorships/actions'
import { push } from 'connected-react-router'


let createArticleActions = {};

createArticleActions.throwError = error => ({
  type: t.CREATE_ARTICLE_FORM.THROW_ERROR,
  payload: error
});

createArticleActions.clearError = () => ({
  type: t.CREATE_ARTICLE_FORM.CLEAR_ERROR
});

createArticleActions.addContributor = contributorName =>
  (dispatch, getState) => {
    const users = usersSelector(getState());
    const contributor = users.find(user => user.name === contributorName);
    const contributorId = contributor.id;

    dispatch({
      type: t.CREATE_ARTICLE_FORM.ADD_CONTRIBUTOR,
      payload: { contributorId }
    });
  };

createArticleActions.removeContributor = contributorId => ({
  type: t.CREATE_ARTICLE_FORM.REMOVE_CONTRIBUTOR,
  payload: { contributorId }
});

createArticleActions.saveFormData =
  (title, content, section) => ({
    type: t.SAVE_CREATE_ARTICLE_FORM_DATA,
    payload: { title, content, section}
  })

createArticleActions.clearFormData =
  (title, content, section) => ({
    type: t.CLEAR_CREATE_ARTICLE_FORM_DATA
  })

createArticleActions.submitForm = ({
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
    if (response.type !== CREATE_AUTHORSHIPS_FAILED) {
      dispatch(fetchAuthorships());
      dispatch(push("/"));
      // Gotta get rid of the draft that autosaves
      dispatch({
        type: t.CREATE_ARTICLE_FORM.CLEAR_FORM_DATA
      });
    }
    else {
      const articleId = response.payload.articleId
      dispatch(deleteArticles([articleId]))
    }
  });
};

export { createArticleActions }

// Not part of the createArticleActions because it's not ambiguous
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
        payload: response.data
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

export const pushArticleOnEditStack =
  (title, content, section, articleId) => ({
    type: t.PUSH_ARTICLE_ON_EDIT_STACK,
    payload: { title, content, section, articleId }
  });

export const popArticleOffEditStack = () => ({
  type: t.POP_ARTICLE_OFF_EDIT_STACK
})

export const fetchArticles = () => (
  dispatch => {
    dispatch({
      type: t.FETCH_ARTICLES_REQUESTED
    })
    axios.get(
      `${STUY_SPEC_API_URL}/articles`,
      AXIOS_CONFIG
    )
    .then(response => {
      dispatch({
        type: t.FETCH_ARTICLES_SUCCEEDED,
        payload: response.data
      })
    })
    .catch(error => {
      dispatch({
        type: t.FETCH_ARTICLES_FAILED,
        payload: error
      })
    })
  }
)

export const setSelectedArticles = selectedArticles => ({
  type: t.SET_SELECTED_ARTICLES,
  payload: selectedArticles
})


export const deleteArticles = articleSlugs => (
  dispatch => {
    dispatch({
      type: t.DELETE_ARTICLES_REQUESTED
    })
    axios
    .all(

      articleSlugs.map(articleSlug =>
        axios.delete(
          `${STUY_SPEC_API_URL}/articles/${articleSlug}`
        )
      )
    )
    .then(response => dispatch({
      type: t.DELETE_ARTICLES_SUCCEEDED,
      payload: articleSlugs
      })
    )
    .catch(error => dispatch({
      type: t.DELETE_ARTICLES_FAILED,
      payload: error
      })
    )
  }
)


