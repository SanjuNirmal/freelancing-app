/* eslint-disable array-callback-return */
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setID, getList, setJobProfile } from "../../reducers/Explore";

import "./Explore.css";

const Explore = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  const data = useSelector((state) => state.jobList.jobList);

  const getData = async () => {
    const res = await axios.get(
      `http://localhost:3420/api/job/view_all`
    );
    console.log(res);

    if (res.data.result.title !== "") {
      dispatch(getList(res.data.result));
    }
  };

  const setReduxStore = async (id) => {
    dispatch(setJobProfile({}));

    let selectedJobProfile = data.filter(function (arr) {
      return arr.id === id;
    });

    dispatch(setJobProfile(selectedJobProfile));

    dispatch(setID(id));
  };

  return (
    <div className="container">
      <div className="outerLayer">
        <input
          placeholder="Enter Post Title"
          onChange={(event) => setQuery(event.target.value)}
          style={{
            borderRadius: 10,
            justifyContent: "center",
            width: 300,
            alignContent: "center",
          }}
        />
        {data
          .filter((post) => {
            if (query === "") {
              return post;
            } else if (
              post.mainTitle.toLowerCase().includes(query.toLowerCase())
            ) {
              return post;
            }
          })
          .map((item) => {
            return (
              <div className="section">
                <Link to="/job">
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
                  Fixed-price - Expert - Est. Budget: ${item.price} - Duration{" "}
                  {item.days} days
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

      <div className="rightSideMenu">
        <div className="component">
          <div className="tileRight">My Categories</div>
          <div className="itemRight">Desktop Software Development</div>
          <div className="itemRight">E - commerce Development</div>
          <div className="itemRight">Other - Software Development</div>
          <div className="itemRight">Mobile Development</div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
