import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import { notes } from "./notes/reducer";

export const rootReducer = combineReducers({
  notes
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
