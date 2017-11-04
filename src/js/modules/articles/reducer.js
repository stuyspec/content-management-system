import {
  DELETE_ARTICLES_SUCCEEDED,
  SET_SELECTED_ARTICLES,
  FETCH_ARTICLES_SUCCEEDED,
  CREATE_ARTICLE_SUCCEEDED,
  EDIT_ARTICLE_FORM,
  CREATE_ARTICLE_FORM
} from "./actionTypes";


const initialState = {
  selected: [],
  list: [],
  forms: {
    create: {
      // This is a list of the contributors to the current article
      // This needs to be in the Redux state because otherwise selectors
      // won't be able to find it
      contributors: [],
    },

    edit: {
      contributors: []
    }
  }
};

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case CREATE_ARTICLE_SUCCEEDED:
      return { ...state, list: [...state.list, action.payload] };
    case DELETE_ARTICLES_SUCCEEDED:
      const articles = [...state.list];
      const selectedArticles = action.payload;
      const newArticles = articles.filter(
        article => !selectedArticles.includes(article.slug)
      );
      return { ...state, list: newArticles, selected: [] };
    case SET_SELECTED_ARTICLES:
      return { ...state, selected: action.payload };
    case FETCH_ARTICLES_SUCCEEDED:
      return { ...state, list: action.payload };

    case CREATE_ARTICLE_FORM.ADD_CONTRIBUTOR:
      return {
        ...state,
        forms: {
          ...state.forms,
          create: {
            ...state.forms.create,
            contributors: [
              ...state.forms.create.contributors,
              action.payload.contributorId
            ]
          }
        }
      };
    case CREATE_ARTICLE_FORM.REMOVE_CONTRIBUTOR:
      // Cause scoping
      return (() => {
        const contributors = state.forms.create.contributors;
        const contributorIndex = contributors.indexOf(
          action.payload.contributorId
        );
        const newContributors = contributors
          .slice(0, contributorIndex)
          .concat(contributors.slice(contributorIndex + 1));
        return {
          ...state,
          forms: {
            ...state.forms,
            create: {
              ...state.forms.create,
              contributors: newContributors
            }
          }
        };
      })();
    case CREATE_ARTICLE_FORM.SAVE_FORM_DATA:
      return {
        ...state,
        forms: {
          ...state.forms,
          create: {
            ...state.forms.create,
            currentDraft: action.payload
          }
        }
      };
    case CREATE_ARTICLE_FORM.CLEAR_FORM_DATA:
      return {
        ...state,
        forms: {
          ...state.forms,
          create: {
            ...state.forms.create,
            currentDraft: {}
          }
        }
      };
    case CREATE_ARTICLE_FORM.ENQUEUE_ERROR:
      return {
        ...state,
        forms: {
          ...state.forms,
          create: {
            ...state.forms.create,
            errors: [...state.forms.create.errors, action.payload]
          }
        }
      };
    case CREATE_ARTICLE_FORM.DEQUEUE_ERROR:
      return {
        ...state,
        forms: {
          ...state.forms,
          create: {
            ...state.forms.create,
            errors: state.forms.create.errors.slice(1)
          }
        }
      };
    case EDIT_ARTICLE_FORM.PUSH_ARTICLE_DRAFT:
      return {
        ...state,
        forms: {
          ...state.forms,
          edit: {
            ...state.forms.edit,
            articlesToEdit: [action.payload, ...state.forms.edit.articlesToEdit]
          }
        }
      };

    case EDIT_ARTICLE_FORM.POP_ARTICLE_DRAFT:
      return {
        ...state,
        forms: {
          ...state.forms,
          edit: {
            ...state.forms.edit,
            contributors: [],
            articlesToEdit: state.forms.edit.articlesToEdit.slice(1)
          }
        }
      };
    case EDIT_ARTICLE_FORM.PUSH_ARTICLE_DRAFTS:
      return {
        ...state,
        selected: [],
        forms: {
          ...state.forms,
          edit: {
            ...state.forms.edit,
            articlesToEdit: [
              ...action.payload,
              ...state.forms.edit.articlesToEdit
            ]
          }
        }
      };
    case EDIT_ARTICLE_FORM.ADD_CONTRIBUTOR:
      return {
        ...state,
        forms: {
          ...state.forms,
          edit: {
            ...state.forms.edit,
            contributors: [
              ...state.forms.edit.contributors,
              action.payload.contributorId
            ]
          }
        }
      };
    case EDIT_ARTICLE_FORM.ADD_CONTRIBUTORS:
      return {
        ...state,
        forms: {
          ...state.forms,
          edit: {
            ...state.forms.edit,
            contributors: [
              ...state.forms.edit.contributors,
              ...action.payload.contributorIds
            ]
          }
        }
      };
    case EDIT_ARTICLE_FORM.REMOVE_CONTRIBUTOR:
      return (() => {
        const contributors = state.forms.edit.contributors;
        const contributorIndex = contributors.indexOf(
          action.payload.contributorId
        );
        const newContributors = contributors
          .slice(0, contributorIndex)
          .concat(contributors.slice(contributorIndex + 1));
        return {
          ...state,
          forms: {
            ...state.forms,
            edit: {
              ...state.forms.edit,
              contributors: newContributors
            }
          }
        };
      })();
    default:
      return state;
      break;
  }

  return state;
};

export default reducer;
