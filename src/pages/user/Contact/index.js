import { Col, Row } from "antd";
import React from "react";
import "./contact.scss";
function Contact() {
  return (
    <div className="contact-container">
      <Row>
        <Col span={12}>
          <div className="block">
            <h1>Contact Us</h1>
            <p>
              We’re as accessible as your good neighbour. Feel free
              <br />
              to give us a shout.
            </p>
            <p className="is-4">
              <span role="img" aria-label="e-mail">
                📧
              </span>{" "}
              <span>minhthuc1999qn@gmail.com</span>
            </p>
            <p>
              <span role="img" aria-label="telephone">
                ☎️
              </span>{" "}
              <span>039.382.9401</span>
            </p>
            <p>
              <span role="img" aria-label="Round Pushpin">
                📍
              </span>{" "}
              102 Hùng Vương, TP.Tam Kỳ, Quảng Nam
            </p>
          </div>
        </Col>
        <Col span={12}>
          <div className="img">
            <img src={require("../../../assets/images/contact.jpg")} alt="" />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Contact;
