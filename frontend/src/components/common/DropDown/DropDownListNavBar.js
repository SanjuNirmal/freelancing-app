import React, { useEffect } from "react";
import "./DropDown.css";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const DropDownListNavBar = () => {
  const name = sessionStorage.getItem("name").split(" ")[0];
  const dropdownTitle = "Hey " + name;

  let navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("is_logged_in") === "true") {
      navigate("/");
    }
  }, []);

  const logoutFunction = () => {
    sessionStorage.setItem("token", "");
    sessionStorage.setItem("userName", "");
    sessionStorage.setItem("name", "");
    sessionStorage.setItem("user", "");
    sessionStorage.setItem("is_logged_in", false);
    alert(
      "You have successfully Signed Out From your Account."
    );
    window.location.reload();
  };

  return (
    <div>
      <DropdownButton id="dropdown-item-button" title={dropdownTitle}>
        <Link style={{ textDecoration: "none" }} to="/profile">
          <Dropdown.Item as="button">My Profile</Dropdown.Item>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/settings">
          <Dropdown.Item as="button">Settings</Dropdown.Item>
        </Link>
        <Dropdown.Divider />
        <Dropdown.Item
          as="button"
          onClick={() => {
            logoutFunction();
          }}
        >
          Sign Out
        </Dropdown.Item>
      </DropdownButton>
    </div>
  );
};

export default DropDownListNavBar;
