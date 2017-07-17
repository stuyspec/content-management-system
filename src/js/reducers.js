import combineReducers     from 'redux/lib/combineReducers'
import { routerReducer }   from 'react-router-redux/reducer'
import core                from './modules/core'
import forms                from './modules/forms'

export default combineReducers(
{
  [core.constants.NAME]              : core.reducer,
  [forms.constants.NAME]             : forms.reducer,
  router                             : routerReducer
});
