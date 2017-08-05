import {
  ADD_CONTRIBUTOR,
  REMOVE_CONTRIBUTOR,
  SAVE_ARTICLE_FORM_DATA,
  CLEAR_ARTICLE_FORM_DATA,
  CLEAR_ARTICLE_FORM_ERROR,
  THROW_ARTICLE_FORM_ERROR,
  CREATE_AUTHORSHIPS_FAILED
} from './actionTypes'

  const initialState = {
    // Stores just the ids of the users. Will use selectors
    // to get the actual list of names
    article: {
      title: "",
      section: "",
      content: "",
      contributors: [],
      error: ""
    }
  };

  const reducer = (state={...initialState}, action)=>
  {
      switch(action.type)
      {
        case ADD_CONTRIBUTOR :
          return {
            ...state,
            article: {
              ...state.article,
              contributors: [
                ...state.article.contributors,
                action.payload.contributorId
              ]
            }
          };
        case REMOVE_CONTRIBUTOR:
          const contributors = state.article.contributors;
          const contributorIndex = contributors.indexOf(
            action.payload.contributorId
          );
          const newContributors = contributors.slice(0, contributorIndex).concat(
            contributors.slice(contributorIndex + 1)
          );
          return {
            ...state,
            article: {
              ...state.article,
              contributors: newContributors
            }
          };
        case SAVE_ARTICLE_FORM_DATA:
          return {
            ...state,
            article: {
              ...action.payload,
              contributors: state.article.contributors
            }
          }
        case CLEAR_ARTICLE_FORM_DATA:
          return {
            ...state,
            article: {
              contributors: []
            }
          }
        case CLEAR_ARTICLE_FORM_ERROR:
          return {
            ...state,
            article: {
              ...state.article,
              error: ""
            }
          }
        case THROW_ARTICLE_FORM_ERROR:
          return {
            ...state,
            article: {
              ...state.article,
              error: action.payload
            }
          }
        case CREATE_AUTHORSHIPS_FAILED:
          const error = "Creating contributors failed. Please try again"
          return { ...state, article: { ...state.article, error }}
        default:
              break;
      }

      return state;
  };

  export default reducer