import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import rootReducer from "../reducers";
import axios from "axios";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const jwtToken = localStorage.getItem("JWT_TOKEN");
axios.defaults.headers.common["Authorization"] = "Bearer " + jwtToken;

export const store = createStore(
  rootReducer,
  {
    auth: {
      token: jwtToken,
      isAuthenticated: jwtToken ? true : false
    }
  },
  composeEnhancers(applyMiddleware(reduxThunk))
);
