import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getList } from "../../reducers/Explore";
import Select from "react-select";

import "./BecomeSeller.css";
import { Link } from "react-router-dom";

const BecomeSeller = () => {
  const [mainTitle, setMainTitle] = useState("");
  const [content, setContent] = useState("");
  const [days, setDays] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState();
  const [category2, setCategory2] = useState();

  const [categoryList, setCategoryList] = useState([]);

  const userName = useSelector((state) => state.login.userName);
  const postedName = useSelector((state) => state.login.name);
  const dispatch = useDispatch();

  const postTheJob = async () => {
    const data = {
      mainTitle: mainTitle,
      content: content,
      category: category.value,
      category2: category2.value,
      days: days,
      price: price,
      postedUser:
        userName || sessionStorage.getItem("userName") !== ""
          ? userName
            ? userName
            : sessionStorage.getItem("userName")
          : "userName",
      postedName:
        postedName || sessionStorage.getItem("name") !== ""
          ? postedName
            ? postedName
            : sessionStorage.getItem("name")
          : "postedName",
    };

    try {
      const res = await axios.post(`http://localhost:3420/api/job`, { data });
      console.log(res);
      if (res.data.status === "200 OK") {
        console.log("success", res.data);
        dispatch(getList(res.data.job));
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3420/api/category/view_all`
      );
      console.log(res);
      if (res.data.status === "202 OK") {
        setCategoryList(res.data.result);
        console.log("success", res.data);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();

    return () => {};
  }, []);

  const customStyles = {
    control: (base, state) => ({
      ...base,
      textAlign: "left",
    }),
  };
  return (
    <div className="container">
      <Form>
        <div className="formTitleBecomeSeller">Insert Job Information</div>
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Control
            type="text"
            placeholder="Job Title"
            onChange={(event) => {
              setMainTitle(event.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicTitle">
          <div style={{textAlign:"left"}}>
            <Select
              styles={customStyles}
              options={categoryList}
              placeholder="Category 01"
              onChange={(event) => {
                setCategory(event);
              }}
              value={category}
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicTitle">
          <div style={{textAlign:"left"}}>
            <Select
              styles={customStyles}
              options={categoryList}
              placeholder="Category 02"
              onChange={(event) => {
                setCategory2(event);
              }}
              value={category2}
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-3 " controlId="formBasicText">
          <Form.Control
            type="text"
            placeholder="Description"
            className="description"
            onChange={(event) => {
              setContent(event.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Control
            type="text"
            placeholder="Days"
            onChange={(event) => {
              setDays(event.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Control
            type="text"
            placeholder="Price"
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          />
        </Form.Group>
        <Link to="/">
          <Button
            variant="success"
            type="submit"
            onClick={() => {
              postTheJob();
            }}
          >
            Post Job
          </Button>
        </Link>
        <div className="bottom-padding-levels"></div>
      </Form>
    </div>
  );
};

export default BecomeSeller;
