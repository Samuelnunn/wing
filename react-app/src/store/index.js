import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import matchesReducer from './matches';
import matchedReducer from './matched';
import genderPreferenceReducer from './preferences';
import messagesReducer from './messages';
import messageModalReducer from './messageModal';

const rootReducer = combineReducers({
    session: sessionReducer,
    genderPreference: genderPreferenceReducer,
    matches: matchesReducer,
    matched: matchedReducer,
    messages: messagesReducer,
    messageModal: messageModalReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
