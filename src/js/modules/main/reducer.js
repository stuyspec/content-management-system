/**
 * Created by nicholas on 7/20/17.
 */

import {
  CREATE_ARTICLE,
  SET_LANGUAGE,
  REFRESH_WINDOW_DIMENSIONS,
  OPEN_NAV_DRAWER,
  CLOSE_NAV_DRAWER,
  OPEN_USER_DRAWER,
  CLOSE_USER_DRAWER,
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
    language          : 'en',
    viewportWidth     : getViewportWidth(),
    viewportHeight    : getViewportHeight(),
    appMenuOpen       : false,  // for mobile views
    isNavDrawerOpen   : false,
    isUserDrawerOpen  : false,
  };

const reducer = (state={...initialState}, action)=>
{
  switch(action.type)
  {
    case SET_LANGUAGE :
      return Object.assign(
        { ...state },
        { language : action.payload.language }
      );
    case REFRESH_WINDOW_DIMENSIONS :
      let viewportWidth  = getViewportWidth(),
        viewportHeight = getViewportHeight();

      if(state.viewportWidth != viewportWidth || state.viewportHeight != viewportHeight)
      {
        // override width/height which will refresh app view
        return Object.assign({ ...state }, { viewportWidth, viewportHeight });
      }
      else return state;  //otherwise do not mutate
    case OPEN_NAV_DRAWER :
      return { ...state, isNavDrawerOpen: true }

    case CLOSE_NAV_DRAWER :
      return { ...state, isNavDrawerOpen: false }

    case OPEN_USER_DRAWER :
      return { ...state, isUserDrawerOpen: true }

    case CLOSE_USER_DRAWER :
      return { ...state, isUserDrawerOpen: false }
    default:
      return state;
      break;
  }

  return state;
};

export default reducer