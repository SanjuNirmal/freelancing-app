import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import DropDownListNavBar from "../DropDown/DropDownListNavBar";

function Navbar() {
  return (
    <section className="navbar">
      <Link to="/explore" className="navbar-item">
        Explore
      </Link>
      <Link to="/about" className="navbar-item">
        About
      </Link>
      <Link to="/become-seller" className="navbar-item">
        Post A Job
      </Link>
      <Link to="/shop" className="navbar-item">
        Shop
      </Link>
      <div className="navbar-item">
        <DropDownListNavBar />
      </div>
    </section>
  );
}

export default Navbar;
