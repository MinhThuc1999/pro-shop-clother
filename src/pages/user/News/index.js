import { Card, Col, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "./news.scss";
function News() {
  return (
    <div className="news-container">
      <div className="news">
        <h1>News & Updates</h1>
        <div className="news-block">
          <p className="date">OCTOBER 2022</p>
          <p
            className="title-news"
            style={{ fontSize: "21px", fontWeight: "500" }}
          >
            My first Article
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed
            purus nec nulla blandit rutrum. Nulla iaculis lacus eget libero
            viverra tincidunt. Cras sed mi at sapien semper dignissim in in
            ante. Proin vehicula nibh nec augue dignissim convallis. Ut in est
            et dui tempor porttitor. Suspendisse potenti. Nulla elit erat,
            consectetur euismod blandit nec, tincidunt et dui. In ultrices,
            justo et accumsan consectetur, sapien justo placerat orci, at
            fermentum nulla urna eget enim. Integer at lacinia urna, et aliquet
            velit. Fusce turpis velit, posuere quis tincidunt pharetra, mollis
            vel quam. Sed a enim ipsum. Nam eu arcu ut elit pharetra
            ullamcorper. Curabitur sit amet odio pharetra, pretium odio
            accumsan, blandit massa. Mauris finibus, arcu sed euismod imperdiet,
            neque nibh tristique quam, at pretium magna massa ac risus.
            Curabitur orci metus, auctor ut leo ut, scelerisque tempus ante.
          </p>
          <p>
            <Link to={""}>Read more</Link>
          </p>
        </div>
      </div>
      <div className="coupons">
        <h1>Coupons</h1>
        <div className="cart-block">
          <Card
            title="50% discount"
            bordered={false}
            style={{
              width: 300,
              boxShadow: "1px 1px 2px 2px #DBD6D2",
            }}
          >
            <p style={{ fontSize: "16px", marginBottom: "30px" }}>
              Curabitur semper cursus enim, vel finibus felis.
            </p>
            <Row>
              <Col span={12}>
                <p>COUPON CODE</p>
                <p style={{ fontWeight: "600" }}>FREE50</p>
              </Col>
              <Col span={12}>
                <p>EXIPIRED DATE</p>
                <p style={{ fontWeight: "600" }}>October 2022</p>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default News;
