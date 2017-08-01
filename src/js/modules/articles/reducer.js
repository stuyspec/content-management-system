import {
  DELETE_SELECTED_ARTICLES,
  SAVE_SELECTED_ARTICLES,
  FETCH_ARTICLES_SUCCEEDED
} from './actionTypes'

import {
  CREATE_ARTICLE_SUCCEEDED
} from '../forms/actionTypes'

const initialState = {
  selectedArticles: [],
  articles: [],
  authorship: []
};

const reducer = (state={...initialState}, action)=>
{
  switch(action.type)
  {
    case CREATE_ARTICLE_SUCCEEDED:
      return { ...state, articles: [...state.articlesList, action.payload]}
    case DELETE_SELECTED_ARTICLES:
      let articles = [...state.articles];
      const selectedArticles = action.payload
      selectedArticles.map(articleId => {
        const idIndex = articles.indexOf(
          articles.find(article => article.id === articleId)
        )
        return articles.splice(idIndex, 1)
      })
      return { ...state, articles: articles, selectedArticles: []}

    case SAVE_SELECTED_ARTICLES:
      return { ...state, selectedArticles: action.payload }
    case FETCH_ARTICLES_SUCCEEDED:
      return { ...state, articles: action.payload }
    default:
        break;
    }

    return state;
};

export default reducer

