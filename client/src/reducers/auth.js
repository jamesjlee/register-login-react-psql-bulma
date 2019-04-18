import {
  AUTH_REGISTER,
  AUTH_LOGOUT,
  AUTH_LOGIN,
  AUTH_ERROR,
  AUTH_CLEAR_ERROR
} from "../actions/types";

const INITIAL_STATE = {
  isAuthenticated: false,
  token: "",
  errMessage: ""
};

export const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_REGISTER:
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        errMessage: ""
      };
    case AUTH_LOGIN:
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        errMessage: ""
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        token: action.payload,
        isAuthenticated: false,
        errMessage: ""
      };
    case AUTH_ERROR:
      return {
        ...state,
        errMessage: action.payload
      };

    case AUTH_CLEAR_ERROR:
      return {
        ...state,
        errMessage: action.payload
      };
    default:
      return {
        ...state
      };
  }
};
