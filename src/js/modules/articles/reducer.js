import {
  DELETE_ARTICLES_SUCCEEDED,
  SET_SELECTED_ARTICLES,
  FETCH_ARTICLES_SUCCEEDED,
  FETCH_AUTHORSHIPS_SUCCEEDED
} from './actionTypes'

import {
  CREATE_ARTICLE_SUCCEEDED
} from '../forms/actionTypes'

const initialState = {
  selected: [],
  list: [],
};

const reducer = (state={...initialState}, action)=>
{
  switch(action.type)
  {
    case CREATE_ARTICLE_SUCCEEDED:
      return { ...state, list: [...state.list, action.payload]}
    case DELETE_ARTICLES_SUCCEEDED:
      const articles = [...state.list];
      const selectedArticles = action.payload
      const newArticles = articles.filter(
        article => !selectedArticles.includes(article.slug)
      )
      return { ...state, list: newArticles, selected: []}

    case SET_SELECTED_ARTICLES:
      return { ...state, selected: action.payload }
    case FETCH_ARTICLES_SUCCEEDED:
      return { ...state, list: action.payload }
    default:
        break;
    }

    return state;
};

export default reducer

