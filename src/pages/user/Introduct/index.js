import { Col, Row } from "antd";
import React from "react";
import "./introduct.scss";
function Introduct() {
  return (
    <div className="introduct">
      <div className="introduct-top">
        <Row>
          <Col span={8}>
            <p>
              <img
                src="https://theshopsatwillowpark.com/wp-content/uploads/2017/12/Screen-Shot-2017-12-21-at-2.51.03-PM.png"
                alt=""
              />
            </p>
          </Col>
          <Col span={8}>
            <p>
              <img
                src="https://elm.umaryland.edu/elm-stories/Elm-Stories-Content/shopping_Online.png"
                alt=""
              />
            </p>
          </Col>
          <Col span={8}>
            <p>
              <img
                src="https://res.heraldm.com/phpwas/restmb_idxmake.php?idx=621&simg=/content/image/2020/04/27/20200427000581_0.jpg"
                alt=""
              />
            </p>
          </Col>
        </Row>
      </div>
      <div className="introduct-content">
        <div className="about-us">
          <h3>Về chúng tôi</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex eadolore magnam aliquam quaerat voluptatem.
          </p>
        </div>
        <div className="mission">
          <h3>Tầm nhìn sứ mệnh</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex eadolore magnam aliquam quaerat voluptatem.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Introduct;
