import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import Login from "./components/Login";
import Collection from "./components/Collection";
import CollectionSingleBookDetail from "./components/CollectionSingleBookDetail";
import Register from "./components/Register";
import { store } from "./store/store";
import authGuard from "./components/HOCs/authGuard";
import NoMatch from "./components/NoMatch";
import Error from "./components/Error";
import { ThemeProvider } from "./components/ThemeContext";
import { styleReducer } from "./reducers/style";

export default function App() {
  const initialState = {
    style: "is-light"
  };
  return (
    <Provider store={store}>
      <ThemeProvider initialState={initialState} reducer={styleReducer}>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Redirect to="/collection" />}
            />
            <Route exact path="/collection" component={authGuard(Collection)} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route
              exact
              name="collectionDetail"
              path="/collection/:id"
              component={authGuard(CollectionSingleBookDetail)}
            />
            <Route exact path="/error/:errMsg" component={Error} />
            <Route path="*" component={NoMatch} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}
