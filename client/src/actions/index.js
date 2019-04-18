import axios from "axios";
import {
  AUTH_REGISTER,
  AUTH_ERROR,
  AUTH_LOGOUT,
  AUTH_LOGIN,
  AUTH_CLEAR_ERROR,
  COLLECTION_GET_SECRET
} from "./types";

export const oauthGoogle = (data) => {
  return async (dispatch) => {
    const res = await axios.post(
      "http://localhost:5000/api/users/oauth/google",
      {
        access_token: data
      }
    );

    dispatch({
      type: AUTH_REGISTER,
      payload: res.data.token
    });
    localStorage.setItem("JWT_TOKEN", res.data.token);
    axios.defaults.headers.common["Authorization"] = "Bearer " + res.data.token;
  };
};

export const register = (data) => {
  return async (dispatch) => {
    try {
      console.log("[ActionCreator] register called!");
      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        data
      );

      dispatch({
        type: AUTH_REGISTER,
        payload: res.data.token
      });

      localStorage.setItem("JWT_TOKEN", res.data.token);
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + res.data.token;
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err.response.data.error
      });
    }
  };
};

export const login = (data) => {
  return async (dispatch) => {
    try {
      console.log("[ActionCreator] login called!");
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        data
      );

      dispatch({
        type: AUTH_LOGIN,
        payload: res.data.token
      });

      localStorage.setItem("JWT_TOKEN", res.data.token);
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + res.data.token;
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err.response.data.error
      });
    }
  };
};

export const logOut = () => {
  return (dispatch) => {
    localStorage.removeItem("JWT_TOKEN");
    axios.defaults.headers.common["Authorization"] = "";
    dispatch({
      type: AUTH_LOGOUT,
      payload: ""
    });
  };
};

export const clearErrorMessage = () => {
  return async (dispatch) => {
    dispatch({
      type: AUTH_CLEAR_ERROR,
      payload: ""
    });
  };
};

export const getSecret = () => {
  return async (dispatch) => {
    try {
      console.log("[ActionCreator] get secret");
      const res = await axios.get("http://localhost:5000/api/users/secret");

      dispatch({
        type: COLLECTION_GET_SECRET,
        payload: res.data.secret
      });
    } catch (err) {
      console.error("err", err);
    }
  };
};
