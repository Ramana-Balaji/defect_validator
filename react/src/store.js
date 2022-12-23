import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import loggerMiddleware from "redux-logger";

// import the rootSaga which we run with our saga middleware
import rootSaga from "./rootSaga";

// import the rootReducer witch we initialise our store with
import rootReducer from "./rootReducer";

const sagaMiddleWare = createSagaMiddleware();

// Add any middleware here for it to be applied to the store
// Note that the order of the middleware is the important here
const middleware = [sagaMiddleWare, loggerMiddleware];

// The default state for our redux store
const defaultState = {};

const store = createStore(
  rootReducer,
  defaultState,
  composeWithDevTools(
    applyMiddleware(...middleware)
    // other store enhancers if any
  )
);
sagaMiddleWare.run(rootSaga);

export default store;
