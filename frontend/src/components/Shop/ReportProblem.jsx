import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const ReportProblem = (props) => {
  const [email, setEmail] = useState("");

  const sendEmail = async () => {
    const dataForEmail = {
      postedUser: "nirmalkarunadasa97@gmail.com",
      title: "FREELANCER - Problem",
      content: email,
      sender: sessionStorage.getItem("userName"),
    };

    const res = await axios.post(`http://localhost:3420/api/send-email`, {
      dataForEmail,
    });
    if (res.status == 201) {
      props.handleClose();
    }
    console.log("Test for response", res);
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
          <Modal.Title>Report Problem</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              as={"textarea"}
              type="text"
              placeholder="Explain Problem"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button
              variant="success"
              type="submit"
              onClick={() => {
                sendEmail();
              }}
            >
              Report
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ReportProblem;
