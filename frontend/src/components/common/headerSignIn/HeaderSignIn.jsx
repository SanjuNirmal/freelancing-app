import React from "react";
import { Link } from "react-router-dom";
import NavbarSign from "../navbarSignin/NavbarSign";

import "./Header.css";

function HeaderSignIn() {
  return (
    <section className="header">
      <section className="header-top">
        <section className="header-top__logo">
          <Link to="/" className="header-logo">
            FREELANCER
          </Link>
        </section>
        <section className="header-top__navbar">
          <section className="header-top__navigation">
            <NavbarSign />
          </section>
          <hr className="header-top__seperator" />
        </section>
      </section>
    </section>
  );
}

export default HeaderSignIn;
