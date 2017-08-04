import {
  DELETE_ARTICLES_SUCCEEDED,
  SAVE_SELECTED_ARTICLES,
  FETCH_ARTICLES_SUCCEEDED,
  FETCH_AUTHORSHIPS_SUCCEEDED
} from './actionTypes'

import {
  CREATE_ARTICLE_SUCCEEDED
} from '../forms/actionTypes'

const initialState = {
  selected: [],
  list: [],
  authorships: [
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
    case CREATE_ARTICLE_SUCCEEDED:
      return { ...state, articles: [...state.articles, action.payload]}
    case DELETE_ARTICLES_SUCCEEDED:
      const articles = [...state.articles];
      const selectedArticles = action.payload
      const newArticles = articles.filter(
        article => !selectedArticles.includes(article.slug)
      )
      return { ...state, articles: newArticles, selected: []}

    case SAVE_SELECTED_ARTICLES:
      return { ...state, selected: action.payload }
    case FETCH_ARTICLES_SUCCEEDED:
      return { ...state, articles: action.payload }
    case FETCH_AUTHORSHIPS_SUCCEEDED:
      return { ...state, authorships: action.payload }
    default:
        break;
    }

    return state;
};

export default reducer

