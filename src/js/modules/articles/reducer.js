import
{
  CREATE_ARTICLE,
  SET_LANGUAGE,
  REFRESH_WINDOW_DIMENSIONS,
  OPEN_NAV_DRAWER,
  CLOSE_NAV_DRAWER
} from './actionTypes'

// getWindowWidth & getWindowHeight was
// adapted from http://stackoverflow.com/a/8876069/1291659
var getViewportWidth = function()
{
    return Math.max(window.document.documentElement.clientWidth, window.innerWidth || 0);
};

var getViewportHeight = function()
{
    return Math.max(window.document.documentElement.clientHeight, window.innerHeight || 0);
};


const initialState =
{
  articles: [],
};

const reducer = (state={...initialState}, action)=>
{
    switch(action.type)
    {
      case CREATE_ARTICLE :
        return { ...state, articlesList: [...state.articlesList, action.payload]}
      default:
        break;
    }

    return state;
};

export default reducer