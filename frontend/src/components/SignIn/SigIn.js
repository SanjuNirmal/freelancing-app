import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useDispatch } from "react-redux";
import "./SignIn.css";
import { Link } from "react-router-dom";
import { login } from "../../reducers/Login";
import { getList } from "../../reducers/Explore";
import { getUser } from "../../Helpers/GetUser";
import EmailVerificationModal from "./EmailVerificationModal";

const SigIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [description, setDescription] = useState("");
  const [verificationError, setVerificationError] = useState(false);
  const [showModal, setShowModal] = useState(true);

  // useEffect(() => {
  // setShowModal(true)
  // }, [third])

  const dispatch = useDispatch();

  const getExploreList = async () => {
    const res = await axios.get(`http://localhost:3420/api/job/view_all`);
    dispatch(getList(res.data.result));
  };

  const validate = (value) => {
    if (value.length < 8) {
      alert("Password should be minimus 8 characters");
    } else {
      if (value === verifyPassword) {
        setPassword(value);
      } else {
        alert("Passwords does not match");
      }
    }
  };

  const signInFunction = async () => {
    validate(password);

    const data = {
      name: name,
      email: email,
      password: password,
      description: description,
    };

    const userName = email;

    console.log("data in the front end", data);

    try {
      const res = await axios.post(`http://localhost:3420/api/register`, {
        data: data,
      });

      if (res.data.status === "200 OK") {
        console.log(res.data.token);
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("userName", userName);
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("user", res.data.user);
        sessionStorage.setItem("is_logged_in", true);
        console.log(res.data);
        dispatch(
          login({
            token: res.data.token,
            userName: email,
            name: res.data.name,
          })
        );

        dispatch(login(res.data.token, userName, name));
        getExploreList();
        getUser(dispatch, userName);
        alert("You have successfully Signed in. Please Reload to Continue");
      } else {
        alert("Error Occurred");
      }
    } catch (error) {
      alert("Registration Error", error);
    }
  };

  return (
    <div className="container">
      <Form>
        <div className="sign-in-header"></div>
        <div className="formTitle sign-in-title" style={{ color: "black" }}>
          Sign In as a new user
        </div>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Control
            type="text"
            placeholder="Enter Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          />
          {/*<Form.Control.Feedback type="invalid">
            Please Provide a valid name.
          </Form.Control.Feedback>*/}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            disabled
            type="email"
            placeholder="Enter email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            value={email}
          />
          <Form.Control.Feedback type="invalid">
            Please Provide a valid Email.
          </Form.Control.Feedback>
          {/*<Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>*/}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          {/*<Form.Control.Feedback type="invalid">
            Please Provide a valid Password.
          </Form.Control.Feedback>*/}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Re Enter Password"
            onChange={(e) => {
              if (e.target.value == password) {
                setVerifyPassword(e.target.value);
                setVerificationError(false);
              } else {
                setVerificationError(true);
              }
            }}
            required
          />
          {verificationError ? (
            <div style={{ color: "red" }}>Password Does not match</div>
          ) : (
            <div></div>
          )}
          <Form.Control.Feedback type="invalid">
            Password does not match.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3 " controlId="formBasicPassword">
          <Form.Control
            type="text"
            placeholder="Say Something About You"
            className="description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            required
          />
        </Form.Group>

        <Link to="/">
          <Button
            variant="success"
            type="submit"
            onClick={() => {
              signInFunction();
            }}
          >
            Sign In
          </Button>
        </Link>
        <div className="text-muted">
          Already have an Account? <Link to="/login">Log In</Link>
        </div>
      </Form>
      <EmailVerificationModal
        show={showModal}
        handleClose={() => {
          setShowModal(false);
        }}
        verified={(e) => {
          setEmail(e);
          setShowModal(false);
        }}
      />
    </div>
  );
};

export default SigIn;
