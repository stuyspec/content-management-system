import {
  FETCH_SECTIONS_FULFILLED
} from "./actionTypes";

// The reason sections are an array is because they're relatively small,
// so finding a section is not computationally difficult. Users, on the other
// hand are really large so finding a user shouldn't be an O(n) task.
const initialState = {
  list: [],
  selected: []
};

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case FETCH_SECTIONS_FULFILLED:
      return { ...state, list: action.payload }
    default:
      break;
  }
  return state;
};

export default reducer;