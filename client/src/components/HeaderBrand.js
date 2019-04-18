import React from "react";
import { Link } from "react-router-dom";

export default function HeaderBrand() {
  return (
    <div className="navbar-brand">
      <Link className="navbar-item" to="/">
        <h1>James' Bookstore</h1>
      </Link>
      <div className="navbar-burger burger">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
