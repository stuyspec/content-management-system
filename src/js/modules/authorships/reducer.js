/**
 * Created by nicholas on 8/4/17.
 */
import {
  FETCH_AUTHORSHIPS_SUCCEEDED
} from './actionTypes'
import {
  CREATE_AUTHORSHIPS_SUCCEEDED
} from '../forms/actionTypes'

const initialState = {
  list: [
    {
      articleId: 1,
      userId: 2
    },
    {
      articleId: 12,
      userId: 0
    }
  ]
};

const reducer = (state={...initialState}, action)=>
{
  switch(action.type)
  {
    case FETCH_AUTHORSHIPS_SUCCEEDED:
      return { ...state, list: action.payload }
    case CREATE_AUTHORSHIPS_SUCCEEDED:
      return { ...state, list: [...state.list, action.payload]}
    default:
      break;
  }
  return state;
};

export default reducer

