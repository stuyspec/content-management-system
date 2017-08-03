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
  articles: [],
  authorships: []
};

const reducer = (state={...initialState}, action)=>
{
  switch(action.type)
  {
    case CREATE_ARTICLE_SUCCEEDED:
      return { ...state, articles: [...state.articles, action.payload]}
    case DELETE_ARTICLES_SUCCEEDED:
      let articles = [...state.articles];
      const selectedArticles = action.payload
      selectedArticles.map(articleId => {
        const idIndex = articles.indexOf(
          articles.find(article => article.id === articleId)
        )
        return articles.splice(idIndex, 1)
      })
      return { ...state, articles: articles, selected: []}

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

