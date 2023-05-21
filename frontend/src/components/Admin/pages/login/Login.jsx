import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../../login/LogIn.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const logInFunction = () => {
    axios
      .post(`http://localhost:3420/api/login`, {
        userName: email,
        password: password,
      })
      .then((res) => {
        // console.log(res.data.status);
        if (res.data.status === "200 OK") {
          const admin = "admin";
          sessionStorage.setItem("token", res.data.token);
          sessionStorage.setItem("userName", admin);
          sessionStorage.setItem("name", admin.toUpperCase());
          sessionStorage.setItem("user", res.data.user);
          sessionStorage.setItem("is_admin_user", true);
          console.log(res.data);
          alert("You have successfully logged in. Please Reload to Continue");
        } else {
          setError("Error Occurred");
        }
      })
      .catch((e) => {
        console.log(e);
        alert("Error Ocurred", e);
      });
  };

  return (
    <div className="container">
      <Form hasValidation>
        <div className="formTitle">Log In</div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            isInvalid
          />
          <Form.Control.Feedback type="invalid">
            Please Provide a valid Email.
          </Form.Control.Feedback>

          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <Form.Control.Feedback type="invalid">
            Please Provide a valid Passport.
          </Form.Control.Feedback>
        </Form.Group>
        <Link to="/">
          <Button
            variant="success"
            type="submit"
            onClick={() => {
              logInFunction();
            }}
          >
            Admin Log In
          </Button>
        </Link>
        <div className="errorContainer">{error}</div>
      </Form>
    </div>
  );
};

export default Login;
