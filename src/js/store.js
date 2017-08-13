import applyMiddleware from 'redux/lib/applyMiddleware'
import createStore from 'redux/lib/createStore'
import thunk  from 'redux-thunk'
import promise from 'redux-promise-middleware'
import reducer from './reducers'
import localizer from 'middleware/localizer'
import logger from 'redux-logger'
import routerMiddleware from 'react-router-redux/middleware'
import appHistory from 'tools/appHistory'
import { composeWithDevTools } from 'redux-devtools-extension'

let middleware;

if (process.env.NODE_ENV == 'production') {
  middleware = applyMiddleware(
    promise(),
    thunk,
    localizer,
    routerMiddleware(appHistory) //for intercepting navigation actions
  );
}
else {
  middleware = composeWithDevTools(
    applyMiddleware(
      promise(),
      thunk,
      logger,
      localizer,
      routerMiddleware(appHistory)
    )
  );
}

export default createStore(reducer, middleware)
