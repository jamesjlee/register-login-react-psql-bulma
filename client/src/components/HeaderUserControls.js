import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import { useThemeValue } from "./ThemeContext";

function HeaderUserControls(props) {
  const [state, dispatch] = useThemeValue();
  const [toggleState, setToggleState] = useState({ checked: "" });

  useEffect(() => {
    if (state.style === "is-light") {
      setToggleState({ ...toggleState, checked: "" });
    } else {
      setToggleState({ ...toggleState, checked: "checked" });
    }
  }, [state]);

  let styles = {
    marginRight: ".5rem"
  };

  async function register() {
    await props.clearErrorMessage();
  }

  async function login() {
    await props.clearErrorMessage();
  }

  function logOut() {
    props.logOut();
  }

  function handleDarkModeToggle() {
    dispatch({ type: "toggle" });
  }

  function handleDarkModeOnChange() {
    console.log("dark mode toggled");
  }

  return (
    <div className="navbar-end">
      <div className="navbar-item">
        <div className="buttons">
          <div className="field" style={styles}>
            <input
              id="darkModeToggle"
              type="checkbox"
              name="darkModeToggle"
              className="switch is-rounded"
              onClick={handleDarkModeToggle}
              onChange={handleDarkModeOnChange}
              {...toggleState}
            />
            <label htmlFor="darkModeToggle">Dark Mode</label>
          </div>

          {!props.isAuth ? (
            <div>
              <Link className="button" to="/register" onClick={register}>
                <span>
                  <i style={styles} className="far fa-user-circle" />
                </span>
                Register
              </Link>
              <Link className="button" to="/login" onClick={login}>
                <span>
                  <i style={styles} className="fa fa-sign-in-alt" />
                </span>
                Login
              </Link>
            </div>
          ) : (
            <Link className="button" to="/" onClick={logOut}>
              <span>
                <i style={styles} className="fa fa-sign-out-alt" />
              </span>
              Logout
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isAuth: state.auth.isAuthenticated
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     clearErrorMessage: () => {
//       dispatch(actions.clearErrorMessage());
//     }
//   };
// }

export default connect(
  mapStateToProps,
  actions
)(HeaderUserControls);
