import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeItem } from "../../reducers/Cart";
import "./Shop.css";
import { BiTrash } from "react-icons/bi";

const Cart = ({ show, itemList, setReduxStore, close, ...props }) => {
  const getData = useSelector((state) => state.jobList.shopItemProfile);
  const dataId = getData[0];

  const data = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  return (
    <>
      <Offcanvas placement="end" show={show} onHide={close} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {data &&
            data.map((item ,index) => {
              return (
                <div className="section">
                  <div
                    className="d-flex sectionTile-cart"
                    style={{ cursor: "pointer" }}
                  >
                    {item.mainTitle}

                    <BiTrash
                      className="ms-2"
                      onClick={() => {
                        console.log(index);
                        dispatch(removeItem(index));
                      }}
                    />
                  </div>
                  <div className="sectionDetails">
                    Fixed-price - Expert - Est. Budget: ${item.price}
                  </div>
                  <div className="text-color">{item.content}</div>
                  <div className="location">{item.category}</div>
                  <hr className="header-top__seperator" />
                </div>
              );
            })}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Cart;
