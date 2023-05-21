import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const EmailVerificationModal = (props) => {
  const [email, setEmail] = useState("");
  const [isSend, setIsSend] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [randomNumber, setRandomNumber] = useState(9884191);
  const [showCodeEnter, setShowCodeEnter] = useState(false);
  const timerId = useRef();

  const setTimeer = () => {
    timerId.current = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
  };

  useEffect(() => {
    if (countdown < 0) {
      clearInterval(timerId.current);
      setIsSend(false);
      setCountdown(60);
    }
  }, [countdown]);

  const sendEmail = async () => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      const random = Math.floor(100000 + Math.random() * 900000);
      setRandomNumber(random);

      const dataForEmail = {
        postedUser: email,
        title: "FREELANCER Verification Code",
        content: "Your Verification Code is : " + random,
        sender: sessionStorage.getItem("userName"),
      };

      const res = await axios.post(`http://localhost:3420/api/send-email`, {
        dataForEmail,
      });
      console.log("Test for response", res);
      if (res.status === 201 || res.status === 204) {
        setTimeer();
        setShowCodeEnter(true);
      } else {
        setIsSend(false);
        setShowCodeEnter(true);
      }
      setIsInvalid(false);
    } else {
      setIsInvalid(true);
    }
  };

  const handleCodeEnter = (e) => {
    console.log(e.target.value)
    console.log(randomNumber)
    if (randomNumber == e.target.value) {
      props.verified(email);
    }
  };
  return (
    <div>
      <Modal
        style={{ top: "20%" }}
        size="lg"
        show={props.show}
        onHide={props.handleClose}
      >
        <Modal.Header
          style={{ backgroundColor: "rgb(5, 153, 37);" }}
          closeButton
        >
          <Modal.Title>Email Verification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              isInvalid={isInvalid}
              disabled={isSend}
              type="email"
              placeholder="Enter email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please Provide a valid Email.
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button
              disabled={isSend}
              variant="success"
              type="submit"
              onClick={() => {
                sendEmail();
                setIsSend(true);
              }}
            >
              {isSend
                ? "Re-Send Verification Code - " + countdown
                : "Send Verification Code"}
            </Button>
          </div>
          {showCodeEnter && (
            <div className="d-flex justify-content-center">
              <Form.Group className="mt-4 w-50" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  placeholder=" Enter Verification Code Here..."
                  onChange={(e)=>{
                    handleCodeEnter(e)
                  }}
                />
              </Form.Group>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EmailVerificationModal;
