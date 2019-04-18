import React from "react";
import { useThemeValue } from "./ThemeContext";

export default function Footer() {
  const [state, dispatch] = useThemeValue();

  return (
    <footer className={`footer hero ` + `${state.style}`}>
      <p className="has-text-centered">
        Copyright &copy; 2019. All Rights Reserved.
      </p>
    </footer>
  );
}
