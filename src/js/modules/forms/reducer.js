import {
  ADD_CONTRIBUTOR,
  REMOVE_CONTRIBUTOR,
  SAVE_ARTICLE_DATA
} from './actionTypes'
import { usersSelector } from './selectors'

  const initialState = {
    // Stores just the ids of the users. Will use selectors
    // to get the actual list of names
    contributors: [],
    title: "",
    content: "",
    section: "",
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

        case SAVE_ARTICLE_DATA:
          return { ...state, ...action.payload }
        default:
              break;
      }

      return state;
  };

  export default reducer