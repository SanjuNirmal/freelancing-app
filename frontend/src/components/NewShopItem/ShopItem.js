import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getShopList } from "../../reducers/Explore";
import Select from "react-select";

import "./BecomeSeller.css";
import { Link, useNavigate } from "react-router-dom";

const ShopItem = () => {
  const [mainTitle, setMainTitle] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState();

  const [categoryList, setCategoryList] = useState([]);

  const userName = useSelector((state) => state.login.userName);
  const postedName = useSelector((state) => state.login.name);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const postTheJob = async () => {
    const data = {
      mainTitle: mainTitle,
      content: content,
      category: category.value,
      price: price,
      postedUser: sessionStorage.getItem("userName"),
      postedName: sessionStorage.getItem("name"),
    };

    try {
      const res = await axios.post(`http://localhost:3420/api/shop`, { data });
      console.log(res);
      if (res.data.status === "200 OK") {
        console.log("success", res.data);
        dispatch(getShopList(res.data.result));
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
        `http://localhost:3420/api/item-category/view_all`
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

  return (
    <div className="container">
      <Form>
        <div className="formTitle" style={{ color: "black" }}>
          Create a New Shop Item
        </div>
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Control
            type="text"
            placeholder="Item Name"
            onChange={(event) => {
              setMainTitle(event.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicTitle">
          <div style={{ textAlign: "left" }}>
            <Select
              options={categoryList}
              placeholder="Category 01"
              onChange={(event) => {
                setCategory(event);
              }}
              value={category}
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
            placeholder="Price"
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          />
        </Form.Group>
        <Link to="/shop">
          <Button
            variant="success"
            type="submit"
            onClick={() => {
              postTheJob();
            }}
          >
            Post Shop Item
          </Button>
        </Link>
        <div className="bottom-padding-levels"></div>
      </Form>
    </div>
  );
};

export default ShopItem;
