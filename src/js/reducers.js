import combineReducers     from 'redux/lib/combineReducers'
import { routerReducer }   from 'react-router-redux/reducer'
import articles            from './modules/articles'
import users               from './modules/users'
import sections            from './modules/sections'
import forms               from './modules/forms'
import main                from './modules/main'
import authorships         from './modules/authorships'

export default combineReducers(
{
  [articles.constants.NAME]           : articles.reducer,
  [authorships.constants.NAME]        : authorships.reducer,
  [forms.constants.NAME]              : forms.reducer,
  [main.constants.NAME]               : main.reducer,
  [sections.constants.NAME]           : sections.reducer,
  [users.constants.NAME]              : users.reducer,
  router                              : routerReducer
});
