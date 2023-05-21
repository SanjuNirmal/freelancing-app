/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import {
  AiOutlinePlus,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineSearch,
  AiFillFilter,
  AiFillExclamationCircle,
} from "react-icons/ai";
import { containerClasses, Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setShopItem } from "../../reducers/Explore";
import { Form, FormControl } from "react-bootstrap";
import CloseIcon from "@mui/icons-material/Close";
import "./Shop.css";
import SearchItems from "./SearchItems";
import Cart from "./Cart";
import ReportProblem from "./ReportProblem";

const ShopView = () => {
  const dispatch = useDispatch();

  const [isSearch, setIsSearch] = useState(false);

  const [showcart, setShowcart] = useState(false);

  const [showProblem, setShowProblem] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const data = useSelector((state) => state.jobList.shopItems);
  const dataLeft = useSelector((state) => state.jobList.shopItemsLeft);
  const dataMiddle = useSelector((state) => state.jobList.shopItemsMiddle);
  const dataRight = useSelector((state) => state.jobList.shopItemsRight);

  const navigate = useNavigate();

  const setReduxStore = async (id) => {
    dispatch(setShopItem({}));

    let selectedJobProfile = data.filter(function (arr) {
      return arr.id === id;
    });

    dispatch(setShopItem(selectedJobProfile));
  };

  const closeSearchHandler = () => {
    setSearchResults([]);
    setIsSearch(!isSearch);
  };

  const searchList = () => {
    const filterdList = data.filter((data) => {
      return data.mainTitle.toLowerCase().includes(searchText.toLowerCase());
    });

    if (filterdList.length > 0) {
      setSearchResults(filterdList);
    } else {
      alert("No Results Found");
      setSearchResults([]);
    }
  };

  return (
    <div className="">
      <div className="search-button-items">
        {isSearch !== false ? (
          <div>
            <SearchItems
              onChange={(e) => {
                setSearchText(e);
              }}
              onClickSearch={searchList}
              onClickClose={closeSearchHandler}
              searchResults={searchResults}
              setReduxStore={(e) => {
                setReduxStore(e);
              }}
            />
          </div>
        ) : (
          <div className="container">
            <div className="left-container">
              {dataLeft.map((item) => {
                return (
                  <div className="section">
                    <Link to="/new-shop-item">
                      <button
                        className="sectionTile"
                        onClick={() => {
                          setReduxStore(item.id);
                        }}
                      >
                        {item.mainTitle}
                      </button>
                    </Link>
                    <div className="sectionDetails">
                      Fixed-price - Expert - Est. Budget: ${item.price}
                    </div>
                    <div className="text-color">{item.content}</div>
                    <div className="location">{item.category}</div>
                    <hr className="header-top__seperator" />
                  </div>
                );
              })}
            </div>

            <div className="width-container"></div>

            <div className="left-container">
              {dataMiddle.map((item) => {
                return (
                  <div className="section">
                    <Link to="/new-shop-item">
                      <button
                        className="sectionTile"
                        onClick={() => {
                          setReduxStore(item.id);
                        }}
                      >
                        {item.mainTitle}
                      </button>
                    </Link>
                    <div className="sectionDetails">
                      Fixed-price - Expert - Est. Budget: ${item.price}
                    </div>
                    <div className="text-color">{item.content}</div>
                    <div className="location">
                      {item.category}, {item.category2}
                    </div>
                    <hr className="header-top__seperator" />
                  </div>
                );
              })}
            </div>

            <div className="width-container"></div>

            <div className="left-container">
              {dataRight.map((item) => {
                return (
                  <div className="section">
                    <Link to="/new-shop-item">
                      <button
                        className="sectionTile"
                        onClick={() => {
                          setReduxStore(item.id);
                        }}
                      >
                        {item.mainTitle}
                      </button>
                    </Link>
                    <div className="sectionDetails">
                      Fixed-price - Expert - Est. Budget: ${item.price}
                    </div>
                    <div className="text-color">{item.content}</div>
                    <div className="location">{item.category}</div>
                    <hr className="header-top__seperator" />
                  </div>
                );
              })}
            </div>

            <div className="middle-container"></div>

            <div className="rightSideMenu">
              <div className="component padding-buttons">
                <Tooltip title="Add New Shop Item">
                  <Link to="/new-shop">
                    <Button
                      className="mb-1"
                      variant="outline-success padding-buttons"
                      onClick={() => {}}
                    >
                      <AiOutlinePlus />
                    </Button>
                  </Link>
                </Tooltip>

                <Tooltip title="Go to My Cart">
                  <Button
                    className="mb-1"
                    variant="outline-info padding-buttons"
                    onClick={() => {
                      setShowcart(true);
                    }}
                  >
                    <AiOutlineShoppingCart />
                  </Button>
                </Tooltip>

                <Tooltip title="Go to My Profile">
                  <Button
                    className="mb-1"
                    variant="outline-dark padding-buttons"
                    onClick={() => {
                      navigate("/profile");
                    }}
                  >
                    <AiOutlineUser />
                  </Button>
                </Tooltip>

                <Tooltip title="Search Items">
                  <Button
                    className="mb-1"
                    variant="outline-primary padding-buttons"
                    onClick={() => {
                      setIsSearch(!isSearch);
                    }}
                  >
                    <AiOutlineSearch />
                  </Button>
                </Tooltip>

                <Tooltip title="Filter Items">
                  <Button
                    className="mb-1"
                    variant="outline-warning padding-buttons"
                    onClick={() => {
                      setIsSearch(!isSearch);
                    }}
                  >
                    <AiFillFilter />
                  </Button>
                </Tooltip>

                <Tooltip title="Report a Problem">
                  <Button
                    className="mb-1"
                    variant="outline-danger padding-buttons"
                    onClick={() => {
                      setShowProblem(true);
                    }}
                  >
                    <AiFillExclamationCircle />
                  </Button>
                </Tooltip>

                <hr />
              </div>

              <div className="component">
                <div className="tileRight">My Categories</div>
                <div className="itemRight">Desktop Software Development</div>
                <div className="itemRight">E - commerce Development</div>
                <div className="itemRight">Other - Software Development</div>
                <div className="itemRight">Mobile Development</div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Cart
        show={showcart}
        close={() => {
          setShowcart(false);
        }}
      />

      <ReportProblem
        show={showProblem}
        handleClose={() => {
          setShowProblem(false);
        }}
      />
    </div>
  );
};

export default ShopView;
