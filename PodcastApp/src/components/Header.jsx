import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../components/Header.css";

function Header() {
  return (
    <header className="header">
      <h1>THIS IS A HEADER</h1>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link> |{" "}
        <Link to="/search">Search</Link>
      </nav>
    </header>
  );
}

export default Header;
