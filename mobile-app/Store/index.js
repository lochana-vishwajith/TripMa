import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import AuthReducer from "./reducer";
const RootReducers = combineReducers({
  AuthReducer,
});

export const store = createStore(RootReducers, applyMiddleware(thunk));
