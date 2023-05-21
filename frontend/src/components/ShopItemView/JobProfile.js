/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { Tooltip } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import MessageIcon from "@mui/icons-material/Message";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import ScrollToBottom from "react-scroll-to-bottom";

import "./JobProfile.css";

import { Link, useNavigate } from "react-router-dom";
import { setFavList, removeFavList, addJobDone } from "../../reducers/Explore";
import { getListHelper } from "../../Helpers/GetJobList";
import { addItem } from "../../reducers/Cart";

const socket = io.connect("http://localhost:3620/");

const JobProfileShop = () => {
  const [showEmail, setShowEmail] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const [emailTitle, setEmailTitle] = useState("");
  const [emailContent, setEmailContent] = useState("");

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [room, setRoom] = useState("");

  const [fav, setFav] = useState(false);

  const getData = useSelector((state) => state.jobList.shopItemProfile);
  const userName = useSelector((state) => state.login.userName);
  const name = useSelector((state) => state.login.name).split(" ")[0];

  const data = getData[0];
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const setFavouriteJob = () => {
    dispatch(setFavList(data));
    setFav(!fav);
  };

  const removeFavJob = () => {
    dispatch(removeFavList(data));
    setFav(!fav);
  };

  const removeFromList = async () => {
    const res = await axios.delete(
      `http://localhost:3420/api/job/get/delete/${data.id}`
    );

    if (res.data.response.acknowledged !== false) {
      const replace = true;
      getListHelper(dispatch, replace);
      navigate("/");
    } else {
      console.log("Error in the delete", res.data);
    }
  };

  const jobDone = () => {
    dispatch(addJobDone(data));
  };

  const sendEmail = async () => {
    const content =
      "Hello, you have a message from a user regarding a job. " +
      emailContent +
      ". Please contact the user by emailing following address " +
      userName
        ? userName
        : sessionStorage.getItem("userName");

    const dataForEmail = {
      postedUser: data.postedUser,
      title: emailTitle,
      content: content,
      sender: userName ? userName : sessionStorage.getItem("userName"),
    };

    // console.log("data for email", dataForEmail);

    const res = await axios.post(`http://localhost:3420/api/send-email`, {
      dataForEmail,
    });
    console.log("Test for response", res);
  };

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        author: userName ? userName : sessionStorage.getItem("userName"),
        message: currentMessage,
        room: data.id.split("-")[0] + data.postedUser.split("@")[0],
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setRoom(messageData.room);
      setCurrentMessage("");
      console.log(room);
    }
  };

  const setJobRoomFunction = () => {
    setShowEmail(false);
    setShowMessage(true);
    const roomData = {
      roomID: data.id.split("-")[0] + data.postedUser.split("@")[0],
    };

    setRoom(roomData.roomID);

    socket.emit("join_room", roomData.roomID);
  };

  const toFindDuplicates = (arry) => {
    return arry
      .map((e) => e["message"] + e["author"] + e["time"])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter((obj) => arry[obj])
      .map((e) => arry[e]);
  };

  useEffect(() => {
    socket.on(`receive_message`, (dataFromSocket) => {
      setMessageList((list) => [...list, dataFromSocket]);
    });
  }, [socket]);

  return (
    <div className="container">
      <div className="outerLayer">
        <div className="section">
          <div className="sectionTile">{data.mainTitle}</div>
          <div className="sectionDetails">
            Fixed-price - Expert - Est. Budget: ${data.price} - Duration{" "}
            {data.days} days
          </div>
          <div className="text-color">{data.content}</div>
          <div className="location">
            {data.category}, {data.category2}
          </div>
          <hr className="header-top__seperator" />
        </div>
        <div className="bottom-buttons-row margin-bottom">
          <div className="bottom-buttons">
            <Tooltip title="Email Client" className="button-div">
              <EmailIcon
                onClick={() => {
                  setShowEmail(true);
                  setShowMessage(false);
                }}
                style={{ color: "#EC4760" }}
              />
            </Tooltip>

            <Tooltip title="Message Client" className="button-div">
              <MessageIcon
                onClick={() => {
                  setJobRoomFunction();
                }}
                style={{ color: "blue" }}
              />
            </Tooltip>

            {fav !== false ? (
              <Tooltip title="Remove from Favourites" className="button-div">
                <FavoriteIcon
                  onClick={() => {
                    removeFavJob();
                  }}
                  style={{ color: "pink" }}
                />
              </Tooltip>
            ) : (
              <Tooltip title="Add to Favourites" className="button-div">
                <FavoriteBorderIcon
                  onClick={() => {
                    setFavouriteJob();
                  }}
                  style={{ color: "pink" }}
                />
              </Tooltip>
            )}

            <Tooltip title="Message Client" className="button-div">
              <AddShoppingCartIcon
                onClick={() => {
                  dispatch(addItem(data));
                  alert('Item added to the cart')
                }}
                style={{ color: "green", cursor: "pointer" }}
              />
            </Tooltip>
          </div>

          {userName !== data.postedUser ? (
            <div></div>
          ) : (
            <div className="button-div bottom-buttons-row">
              <div
                className=""
                style={{ fontWeight: "bolder", marginRight: 20 }}
              >
                |
              </div>

              <Tooltip title="The Job is Done" className="button-div">
                <CheckCircleIcon
                  onClick={() => {
                    jobDone();
                  }}
                  style={{ color: "green" }}
                />
              </Tooltip>

              <Tooltip title="Delete the Filed Job" className="button-div">
                <DeleteForeverIcon
                  onClick={() => {
                    removeFromList();
                  }}
                  style={{ color: "red" }}
                />
              </Tooltip>
            </div>
          )}
        </div>

        {showEmail !== false && showMessage !== true ? (
          <div className="email-container">
            <div className="close-header">
              <Tooltip title="Close" className="close-button">
                <CloseIcon
                  onClick={() => {
                    setShowEmail(false);
                    setShowMessage(false);
                  }}
                  style={{ color: "white", fontWeight: "bolder" }}
                />
              </Tooltip>

              <div className="input-segment">
                <Form>
                  <div className="formTitle">Inquiring : {data.mainTitle}</div>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                      type="text"
                      placeholder="Email Title"
                      className="width"
                      onChange={(event) => {
                        setEmailTitle(event.target.value);
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 " controlId="formBasicText">
                    <Form.Control
                      type="text"
                      placeholder="Email Content"
                      className="description"
                      onChange={(event) => {
                        setEmailContent(event.target.value);
                      }}
                    />
                  </Form.Group>
                  <Link to="/explore">
                    <Button
                      variant="btn btn-outline-light"
                      type="submit"
                      onClick={() => {
                        sendEmail();
                      }}
                    >
                      Send Email
                    </Button>
                  </Link>
                </Form>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}

        {showEmail !== true && showMessage !== false ? (
          <div className="chat-window">
            <div className="chat-header">
              <p>
                Live Chat :{" "}
                {userName === data.postedName ||
                sessionStorage.getItem("userName") === data.postedName
                  ? userName
                    ? userName
                    : sessionStorage.getItem("userName")
                  : data.postedName}
              </p>
            </div>
            <div className="chat-body">
              <ScrollToBottom className="message-container">
                {toFindDuplicates(messageList).map((messageContent) => {
                  return (
                    <div
                      className="message"
                      id={
                        userName === messageContent.author ||
                        sessionStorage.getItem("userName") ===
                          messageContent.author
                          ? "you"
                          : "other"
                      }
                    >
                      <div>
                        <div className="message-content">
                          <p>{messageContent.message}</p>
                        </div>
                        <div className="message-meta">
                          <p id="time">{messageContent.time}</p>
                          <p id="author">{name}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </ScrollToBottom>
            </div>
            <div className="chat-footer">
              <input
                type="text"
                value={currentMessage}
                placeholder="Type Here . . . . ."
                className="message-type"
                onChange={(event) => {
                  setCurrentMessage(event.target.value);
                }}
                onKeyPress={(event) => {
                  event.key === "Enter" && sendMessage();
                }}
              />
              <button
                className="bottom-button-send"
                onClick={() => {
                  sendMessage();
                }}
              >
                &#9658;
              </button>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>

      <div className="rightSideMenu">
        <div className="component"></div>
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

export default JobProfileShop;
