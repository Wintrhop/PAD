import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducer/authReducer";

const rootReducer = combineReducers({
  authReducer,
});

const middleware = applyMiddleware(thunk);

export const store = legacy_createStore(rootReducer, middleware);
