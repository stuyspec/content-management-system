import combineReducers from "redux/lib/combineReducers";
import { routerReducer } from "react-router-redux/reducer";
import articles from "./modules/articles";
import users from "./modules/users";
import sections from "./modules/sections";
import main from "./modules/main";
import authorships from "./modules/authorships";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
  [articles.constants.NAME]: articles.reducer,
  [authorships.constants.NAME]: authorships.reducer,
  form: formReducer,
  [main.constants.NAME]: main.reducer,
  [sections.constants.NAME]: sections.reducer,
  [users.constants.NAME]: users.reducer,
  router: routerReducer
});
