import React from "react";
import HeaderBrand from "./HeaderBrand";
import HeaderUserControls from "./HeaderUserControls";
import { useThemeValue } from "./ThemeContext";

export default function Header() {
  const [state, dispatch] = useThemeValue();

  return (
    <header className={`hero ` + `${state.style}`}>
      <nav className="navbar has-shadow">
        <HeaderBrand />

        <div className="navbar-menu">
          <div className="navbar-start">
            <div className="navbar-item">
              <small>Books are power.</small>
            </div>
          </div>
          <HeaderUserControls />
        </div>
      </nav>
    </header>
  );
}
