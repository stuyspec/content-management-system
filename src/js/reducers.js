import combineReducers     from 'redux/lib/combineReducers'
import { routerReducer }   from 'react-router-redux/reducer'
import articles            from './modules/articles'
import users               from './modules/users'
import sections            from './modules/sections'
import forms               from './modules/forms'
import main                from './modules/main'

export default combineReducers(
{
  [articles.constants.NAME]           : articles.reducer,
  [users.constants.NAME]              : users.reducer,
  [sections.constants.NAME]           : sections.reducer,
  [forms.constants.NAME]              : forms.reducer,
  [main.constants.NAME]               : main.reducer,
  router                              : routerReducer
});
