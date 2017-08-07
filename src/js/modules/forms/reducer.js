import {
  ADD_CONTRIBUTOR_TO_CREATE_ARTICLE_FORM,
  REMOVE_CONTRIBUTOR_FROM_CREATE_ARTICLE_FORM,
  PUSH_ARTICLE_ON_EDIT_STACK,
  POP_ARTICLE_OFF_EDIT_STACK,
  SAVE_ARTICLE_FORM_DATA,
  CLEAR_ARTICLE_FORM_DATA,
  CLEAR_ARTICLE_FORM_ERROR,
  THROW_ARTICLE_FORM_ERROR,
  CREATE_AUTHORSHIPS_FAILED
} from './actionTypes'

const initialState = {
  articles: {
    create: {
      // This is a list of the contributors to the current article
      // This needs to be in the Redux state because otherwise selectors
      // won't be able to find it
      contributors: [],

      currentDraft: {
        title: "",
        content: ""
      },
      errors: []
    },

    edit: {
      /*
       This is a stack of article drafts. You can select multiple and
       edit them in sequence. A stack is LIFO or last in first out
       This is because if you navigate away from an article,
       you probably want to see it again when you come back
       Not a great name but, whatever
       */
      articlesToEdit: [],
      errors: []
    }
  }
};

  const reducer = (state={...initialState}, action)=>
  {
      switch(action.type)
      {
        case ADD_CONTRIBUTOR_TO_CREATE_ARTICLE_FORM:
          return {
            ...state,
            articles: {
              ...state.articles,
              create: {
                ...state.articles.create,
                contributors: [
                  ...state.articles.create.contributors,
                  action.payload.contributorId
                ]
              }
            }
          };
        case REMOVE_CONTRIBUTOR_FROM_CREATE_ARTICLE_FORM:
          const contributors = state.articles.create.contributors;
          const contributorIndex = contributors.indexOf(
            action.payload.contributorId
          );
          const newContributors = contributors.slice(0, contributorIndex).concat(
            contributors.slice(contributorIndex + 1)
          );
          return {
            ...state,
            articles: {
              ...state.articles,
              create: {
                ...state.articles.create,
                contributors: newContributors
              }
            }
          };
        case PUSH_ARTICLE_ON_EDIT_STACK:
          return {
            ...state,
            editArticle: {
              ...state.editArticle,
              drafts: [...state.editArticle.drafts, action.payload]
            }
          }
        // NOTE: Read the entry you're popping BEFORE you pop it. Because
        // it ain't coming back
        case POP_ARTICLE_OFF_EDIT_STACK:
          return {
            ...state,
            editArticle: {
              ...state.editArticle,
              contributors: [],
              drafts: state.articles.drafts.slice(0, -1)
            }
          }
        case SAVE_ARTICLE_FORM_DATA:
          return {
            ...state,
            articles: {
              ...state.articles,
              currentDraft: action.payload
            }
          }
        case CLEAR_ARTICLE_FORM_DATA:
          return {
            ...state,
            articles: {
              ...state.articles,
              currentDraft: {}
            }
          }
        case CLEAR_ARTICLE_FORM_ERROR:
          return {
            ...state,
            articles: {
              ...state.articles,
              error: ""
            }
          }
        case THROW_ARTICLE_FORM_ERROR:
          return {
            ...state,
            articles: {
              ...state.articles,
              error: action.payload
            }
          }
        case CREATE_AUTHORSHIPS_FAILED:
          const error = "Creating contributors failed. Please try again"
          return { ...state, articles: { ...state.articles, error }}
        default:
              break;
      }

      return state;
  };

  export default reducer