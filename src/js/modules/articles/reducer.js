import {
  DELETE_SELECTED_ARTICLES,
  SAVE_SELECTED_ARTICLES,
  FETCH_ARTICLES_SUCCEEDED
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
      return { ...state, list: [...state.list, action.payload]}
    case DELETE_SELECTED_ARTICLES:
      let articles = [...state.list];
      const selectedArticles = action.payload
      selectedArticles.map(articleId => {
        const idIndex = articles.indexOf(
          articles.find(article => article.id === articleId)
        )
        return articles.splice(idIndex, 1)
      })
      return { ...state, list: articles, selected: []}

    case SAVE_SELECTED_ARTICLES:
      return { ...state, selected: action.payload }
    case FETCH_ARTICLES_SUCCEEDED:
      return { ...state, list: action.payload }
    default:
        break;
    }

    return state;
};

export default reducer

