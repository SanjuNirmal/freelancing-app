/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import "./Profile.css";
import MyPhoto from "../../assets/images/sample-avatar.jpg";
import {
  editDescriptionFunction,
  editNameFunction,
  setID,
  setJobProfile,
} from "../../reducers/Explore";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Tooltip } from "@mui/material";
import Button from "react-bootstrap/Button";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { getJLByUserHelper } from "../../Helpers/GetJobByUser";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.jobList.user);
  const jobListByTheUser = useSelector(
    (state) => state.jobList.jobListByTheUser
  );

  const [userData, setUserData] = useState();
  const [editName, setEditName] = useState(false);
  const [editDescription, setEditDescription] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const setReduxStore = async (id) => {
    dispatch(setJobProfile({}));

    let selectedJobProfile = jobListByTheUser.filter(function (arr) {
      return arr.id === id;
    });

    dispatch(setJobProfile(selectedJobProfile));

    dispatch(setID(id));
  };

  const onEditName = () => {
    updateUserNmame()
    dispatch(editNameFunction(name));
    setEditName(!editName);
  };

  const onEditDescription = () => {
    updateUserDescription()
    dispatch(editDescriptionFunction(description));
    setEditDescription(!editDescription);
  };

  React.useEffect(() => {
    getUser(sessionStorage.getItem("userName"));
    console.log(user);
    getJLByUserHelper(dispatch, sessionStorage.getItem("userName"));
  }, []);

  const getUser = async (userName) => {
    console.log("getUserCall");
    const res = await axios.get(
      `http://localhost:3420/api/user/view_one/${userName}`,
      {
        userName,
      }
    );

    console.log(res);

    setUserData(res.data.result);
  };

  const updateUserNmame = async () => {
    console.log("getUserCall");
    const res = await axios.post(`http://localhost:3420/api/user/update/name`, 
    {
      userName: sessionStorage.getItem("userName"),
      name: name,
    });

    if (res.data.status === "202 OK") {
      getUser(sessionStorage.getItem("userName"));
    }
  };


  const updateUserDescription = async () => {
    console.log("getUserCall");
    const res = await axios.post(`http://localhost:3420/api/user/update/description`, 
    {
      userName: sessionStorage.getItem("userName"),
      description: description,
    });

    if (res.data.status === "202 OK") {
      getUser(sessionStorage.getItem("userName"));
    }
  };

  return (
    <div className="container-profile">
      <div className="left-section">
        <img
          src={MyPhoto}
          style={{
            //display: "flex",
            borderRadius: 100,
            width: 155,
            alignSelf: "center",
          }}
        />

        <div className="edit-button-container" style={{ marginTop: 10 }}>
          {editName !== false ? (
            <div className="user-name-input">
              <input
                type="text"
                placeholder={user.name}
                className="user-name"
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </div>
          ) : (
            <div className="user-name">{userData && userData.name}</div>
          )}

          <div className="icons-buttons">
            <div className="icon-button" style={{ marginLeft: 5 }}>
              <Tooltip title="Edit">
                <ModeEditIcon
                  style={{ fontSize: "medium" }}
                  onClick={() => {
                    setEditName(!editName);
                  }}
                />
              </Tooltip>
            </div>
            <div className="save-button-container" style={{ marginLeft: 15 }}>
              {editName !== false ? (
                <div>
                  <Button
                    variant="outline-success"
                    onClick={() => {
                      onEditName();
                    }}
                  >
                    Save
                  </Button>
                  <Tooltip title="Close">
                    <CloseIcon
                      style={{ fontSize: "medium", marginLeft: 5 }}
                      onClick={() => {
                        setEditName(!editName);
                      }}
                    />
                  </Tooltip>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>

        <div className="user-location">{userData && userData.userName}</div>

        <div className="user-about-me">About Me</div>
        <div className="edit-button-container" style={{ marginTop: 10 }}>
          {editDescription !== false ? (
            <div className="user-name-input">
              <input
                type="text"
                placeholder={userData && userData.description}
                className="user-about"
                style={{ height: 150 }}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </div>
          ) : (
            <div className="user-about">{userData && userData.description}</div>
          )}

          <div className="icons-buttons">
            <div className="icon-button" style={{ marginLeft: 5 }}>
              <Tooltip title="Edit">
                <ModeEditIcon
                  style={{ fontSize: "medium" }}
                  onClick={() => {
                    setEditDescription(!editDescription);
                  }}
                />
              </Tooltip>
            </div>
            <div className="save-button-container" style={{ marginLeft: 15 }}>
              {editDescription !== false ? (
                <div>
                  <Button
                    variant="outline-success"
                    onClick={() => {
                      onEditDescription();
                    }}
                  >
                    Save
                  </Button>
                  <Tooltip title="Close">
                    <CloseIcon
                      style={{ fontSize: "medium", marginLeft: 5 }}
                      onClick={() => {
                        setEditDescription(!editDescription);
                      }}
                    />
                  </Tooltip>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>

        <div className="padding">.</div>
      </div>

      <div className="middle-section">.</div>

      <div className="right-section">
        {jobListByTheUser &&
          jobListByTheUser.map((item) => {
            return (
              <div className="section">
                <Link to="/job">
                  <button
                    className="sectionTile"
                    onClick={() => {
                      setReduxStore(item.id);
                    }}
                    style={{ alignContent: "left" }}
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
    </div>
  );
};

export default Profile;
