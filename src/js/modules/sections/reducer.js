import {
  CREATE_SECTION_SUCCEEDED,
} from './../forms/actionTypes'
import {
  FETCH_SECTIONS_SUCCEEDED
} from './actionTypes'
// The reason sections are an array is because they're relatively small,
// so finding a section is not computationally difficult. Users, on the other
// hand are really large so finding a user shouldn't be an O(n) task
const initialState = {
  sections: []
};

const reducer = (state={...initialState}, action)=>
{
    switch(action.type)
    {
      case CREATE_SECTION_SUCCEEDED:
        return { ...state, sections: [...state.sections, action.payload]}
      default:
        break;
      case FETCH_SECTIONS_SUCCEEDED:
        return { ...state, sections: action.payload}
    }

    return state;
};

export default reducer