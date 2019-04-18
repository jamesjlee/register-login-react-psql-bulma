import React, { useReducer, createContext, useContext } from "react";

const initialState = { style: "is-light" };
const ThemeContext = createContext(initialState);
export const ThemeProvider = ({ reducer, initialState, children }) => (
  <ThemeContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </ThemeContext.Provider>
);

export const useThemeValue = () => useContext(ThemeContext);
