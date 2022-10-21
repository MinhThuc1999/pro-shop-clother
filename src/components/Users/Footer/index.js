import React from "react";
import "./footer.scss";
import { Col, Row } from "antd";
import { FaFacebookF, FaGooglePlusG, FaPinterest } from "react-icons/fa";
import { AiOutlineTwitter, AiOutlineWifi, AiOutlineMail } from "react-icons/ai";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-inner section-box">
        <Row>
          <Col span={6}>
            <div className="footer--logo">
              <Link to={"/"}>
                <img src={require("../../../assets/images/logo.jpg")} alt="" />
              </Link>
            </div>
          </Col>
          <Col span={6}>
            <div className="footer--item">
              <h3>Công ty Clother Việt Nam</h3>

              <p>
                Shop Quang Nam: <br />
                +84 (0)983 418 935 <br />
                Shop Đa Nang: <br />
                +84 (0)917 850 810
              </p>
              <p>minhthuc1999qn@gmail.com</p>
            </div>
          </Col>
          <Col span={6}>
            <div className="footer--item">
              <h3>ĐỊA CHỈ</h3>

              <p>
                <b>Quảng Nam</b>
                <br />
                102 hùng vương, TP.Tam Kỳ, Quảng Nam
              </p>

              <p>
                <b>Đà Nẵng:</b>
                <br />
                38 Yên Bái, Hải Châu, Đà Nẵng
              </p>
            </div>
          </Col>
          <Col span={6}>
            <div className="footer--item footer__subscribe-box">
              <h3>ĐĂNG KÝ NHẬN TIN KHUYẾN MÃI</h3>
              <div className="footer--subcribe">
                <form action="">
                  <div className="form-group">
                    <label>
                      <AiOutlineMail size={25} />
                    </label>
                    <input
                      type="email"
                      placeholder="Email của bạn"
                      name=""
                      id=""
                    />
                  </div>
                </form>
              </div>

              <div className="footer--social">
                <ul>
                  <Link className="link" to="">
                    <FaFacebookF />
                  </Link>
                  <Link className="link" to="">
                    <AiOutlineTwitter />
                  </Link>
                  <Link className="link" to="">
                    <AiOutlineWifi />
                  </Link>
                  <Link className="link" to="">
                    <FaGooglePlusG />
                  </Link>
                  <Link className="link" to="">
                    <FaPinterest />
                  </Link>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="bottom">
        <div className="section container">
          <div className="columns has-text-white">
            <Row>
              <Col span={12}>
                <p>
                  Copyright © 2022 - Pro Ecommerce | build by -{"pro-shop.com"}
                </p>
              </Col>
              <Col span={5} offset={7}>
                <img
                  src={require("../../../assets/images/payment-strip.png")}
                  style={{ height: "26px" }}
                  alt="payments cards"
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
