import {
  FETCH_SECTIONS_SUCCEEDED,
  DELETE_SECTIONS_SUCCEEDED,
  CREATE_SECTION_SUCCEEDED,
  SET_SELECTED_SECTIONS
} from './actionTypes'
// The reason sections are an array is because they're relatively small,
// so finding a section is not computationally difficult. Users, on the other
// hand are really large so finding a user shouldn't be an O(n) task
const initialState = {
  list: [],
  selected: []
};

const reducer = (state={...initialState}, action)=>
{
    switch(action.type)
    {
      case CREATE_SECTION_SUCCEEDED:
        return { ...state, list: [...state.list, action.payload]}
      case FETCH_SECTIONS_SUCCEEDED:
        return { ...state, list: action.payload}
      case SET_SELECTED_SECTIONS:
        return { ...state, selected: action.payload.sectionIds }
      default:
        break;
    }

    return state;
};

export default reducer