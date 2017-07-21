/**
 * Created by nicholas on 7/20/17.
 */
import * as t from "./actionTypes"


export const openNavDrawer = () => ({
  type: t.OPEN_NAV_DRAWER,
  payload : {}
});

export const closeNavDrawer = () => ({
  type: t.CLOSE_NAV_DRAWER,
  payload : {}
});


export const setLanguage = (language)=>
  ({
    type    : t.SET_LANGUAGE,
    payload : { language }
  });

export const refreshWindowDimensions = ()=>
  ({
    type : t.REFRESH_WINDOW_DIMENSIONS,
    payload : {}
  });