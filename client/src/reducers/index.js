import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { authReducer } from "./auth";
import { collectionReducer } from "./collection";

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  collection: collectionReducer
});

export default rootReducer;
