import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { login } from "../../reducers/Login";
import { useDispatch } from "react-redux";
import { atLoginSetUser, getList, getShopList } from "../../reducers/Explore";

import "./LogIn.css";
import { Link, useNavigate } from "react-router-dom";
import { getJLByUserHelper } from "../../Helpers/GetJobByUser";

const LogIn = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("is_logged_in") === "true") {
      navigate("/");
    }
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const getExploreList = async () => {
    const res = await axios.get(`http://localhost:3420/api/job/view_all`);
    const resShop = await axios.get(`http://localhost:3420/api/shop/view_all`);

    sessionStorage.setItem("job_list", res.data.result);
    sessionStorage.setItem("shop_list", resShop.data.result);

    res.data.result.forEach((element) => {
      dispatch(getList(element));
    });

    resShop.data.result.forEach((element) => {
      dispatch(getShopList(element));
    });
  };

  const logInFunction = () => {
    let data = {
      userName: email,
      password: password,
    };

    axios
      .post(`http://localhost:3420/api/login`, {
        data: data,
      })
      .then((res) => {
        // console.log(res.data.status);
        if (res.data.status === "200 OK") {
          // console.log(res.data.token)
          sessionStorage.setItem("token", res.data.token);
          sessionStorage.setItem("userName", res.data.user.userName);
          sessionStorage.setItem("name", res.data.name);
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

          dispatch(atLoginSetUser(res.data.user));
          getExploreList();
          getJLByUserHelper(dispatch, email);
          // setPopupTrigger(true);
          window.location.reload();
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
        <div className="formTitle" style={{ color: "black" }}>
          Log In
        </div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          {email.includes("@") || email === "" ? (
            <div></div>
          ) : (
            <Form.Control.Feedback type="invalid">
              Please Provide a valid Email.
            </Form.Control.Feedback>
          )}

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
        <Link to="">
          <Button
            variant="success"
            type="submit"
            onClick={() => {
              logInFunction();
            }}
          >
            Log In
          </Button>
        </Link>
        {/* <Link to="/admin_login">
          <Button
            variant="success"
            type="submit"
          >
            Admin Log In
          </Button>
          </Link>*/}
        <div className="errorContainer">{error}</div>
        <div className="text-muted">
          Do not have an Account? <Link to="/sign-in">Sign Up</Link>
        </div>
      </Form>
    </div>
  );
};

export default LogIn;
