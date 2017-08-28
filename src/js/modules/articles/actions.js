import * as t from './actionTypes'
import { CREATE_AUTHORSHIPS_FAILED } from '../authorships/actionTypes'
import { STUY_SPEC_API_URL, AXIOS_CONFIG } from '../../constants'
import axios from 'axios'
import { usersSelector } from '../users/selectors'
import {
  createAuthorships,
  fetchAuthorships,
  updateAuthorships } from '../authorships/actions'
import { push } from 'connected-react-router'
import { getSelectedArticlesWithContributors } from './selectors'

// The reason these are two different objects is because the actions
// have subtly different error handling. If I can find a way to collapse
// the actions into one object, I will. But for now they're separate
let createArticleActions = {};

createArticleActions.dequeueError = () => ({
  type: t.CREATE_ARTICLE_FORM.DEQUEUE_ERROR,
});

createArticleActions.enqueueError = error => ({
  type: t.CREATE_ARTICLE_FORM.ENQUEUE_ERROR,
  payload: error
});

createArticleActions.addContributor = contributorUsername =>
  (dispatch, getState) => {
    const users = usersSelector(getState());
    const contributor = users.find(
      user => user.username === contributorUsername
    );
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
    type: t.CREATE_ARTICLE_FORM.SAVE_FORM_DATA,
    payload: { title, content, section}
  })

createArticleActions.clearFormData =
  (title, content, section) => ({
    type: t.CREATE_ARTICLE_FORM.CLEAR_FORM_DATA,
  })

createArticleActions.submitForm = ({
                                          title,
                                          content,
                                          sectionId,
                                          contributors
                                        }) => dispatch => {
  dispatch(createArticle({ title, content, sectionId }))
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
export const createArticle = ({ title, content, sectionId }) => dispatch => {
  // TODO: Create loading anims
  dispatch({
    type: t.CREATE_ARTICLE_REQUESTED
  });
  const article = { title, content, section: sectionId };
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

let editArticleActions = {};

editArticleActions.throwError = error => ({
  type: t.EDIT_ARTICLE_FORM.THROW_ERROR,
  payload: error
});

editArticleActions.clearError = () => ({
  type: t.EDIT_ARTICLE_FORM.CLEAR_ERROR
});

editArticleActions.addContributor = contributorUsername =>
  (dispatch, getState) => {
    const users = usersSelector(getState());
    const contributor = users.find(
      user => user.username === contributorUsername
    );
    const contributorId = contributor.id;

    dispatch({
      type: t.EDIT_ARTICLE_FORM.ADD_CONTRIBUTOR,
      payload: { contributorId }
    });
  };

editArticleActions.addContributors = contributorIds => ({
  type: t.EDIT_ARTICLE_FORM.ADD_CONTRIBUTORS,
  payload: { contributorIds }
})


editArticleActions.removeContributor = contributorId => ({
  type: t.EDIT_ARTICLE_FORM.REMOVE_CONTRIBUTOR,
  payload: { contributorId }
});

editArticleActions.pushArticleDraft =
  ({title, content, section, articleId}) => ({
    type: t.EDIT_ARTICLE_FORM.PUSH_ARTICLE_DRAFT,
    payload: { title, content, section, articleId }
  });

editArticleActions.popArticleDraft = () => ({
  type: t.EDIT_ARTICLE_FORM.POP_ARTICLE_DRAFT
})

editArticleActions.submitForm = ({ title,
                                   content,
                                   section,
                                   contributors }) => dispatch => {
  dispatch(updateArticle({ title, content, section }))
  .then(response => {
    return dispatch(updateAuthorships(contributors, response.data.id));
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

editArticleActions.editSelectedArticles = () => (dispatch, getState) => {
  const selectedArticles = getSelectedArticlesWithContributors(getState());
  dispatch({
    type: t.EDIT_ARTICLE_FORM.PUSH_ARTICLE_DRAFTS,
    payload: selectedArticles
  })
  dispatch(push("/articles/edit"))
}

export { editArticleActions };


export const updateArticle = ({ title,
                                content,
                                section,
                                articleId }) => dispatch => {
  // TODO: Create loading anims
  dispatch({
    type: t.UPDATE_ARTICLE_REQUESTED
  });
  const article = { title, content, section };
  return (
    axios
    .put(`${STUY_SPEC_API_URL}/articles/${articleId}`, article)
    .then(response => {
      dispatch({
        type: t.UPDATE_ARTICLE_SUCCEEDED,
        payload: response.data
      });
      return response;
    })
    // TODO: Create error messages for requests
    .catch(error => {
      dispatch({
        type: t.UPDATE_ARTICLE_FAILED,
        payload: error
      });
    })
  );
};


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


