import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

function NavbarSign() {
  return (
    <section className="navbar">
      <Link to="/explore" className="navbar-item">
        Explore
      </Link>
      <Link to="/about" className="navbar-item">
        About
      </Link>
      <Link to="/shop" className="navbar-item">
        Shop
      </Link>
      <Link to="/sign-in" className="navbar-item">
        Join
      </Link>
    </section>
  );
}

export default NavbarSign;
