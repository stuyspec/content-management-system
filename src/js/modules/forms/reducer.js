import {
  ADD_CONTRIBUTOR,
  REMOVE_CONTRIBUTOR,
  SAVE_ARTICLE_FORM_DATA,
  CLEAR_ARTICLE_FORM_DATA
} from './actionTypes'

  const initialState = {
    // Stores just the ids of the users. Will use selectors
    // to get the actual articles of names
    contributors: [],
    articleForm: {}
  };

  const reducer = (state={...initialState}, action)=>
  {
      switch(action.type)
      {
        case ADD_CONTRIBUTOR :
          return {
            ...state,
            contributors: [ ...state.contributors, action.payload.contributorId]
          };
        case REMOVE_CONTRIBUTOR:
          const contributors = state.contributors;
          const contributorIndex = contributors.indexOf(
            action.payload.contributorId
          );
          const newContributors = contributors.slice(0, contributorIndex).concat(
            contributors.slice(contributorIndex + 1)
          );
          return { ...state, contributors: newContributors };
        case SAVE_ARTICLE_FORM_DATA:
          return { ...state, articleForm: action.payload }
        case CLEAR_ARTICLE_FORM_DATA:
          return { ...state, articleForm: {}, contributors: [] }
        default:
              break;
      }

      return state;
  };

  export default reducer