import React, { useEffect } from "react";
import { Button, Col, Row, InputNumber } from "antd";
import { AiOutlineTwitter, AiOutlineWifi } from "react-icons/ai";
import { FaFacebookF, FaGooglePlusG, FaPinterest } from "react-icons/fa";
import formatMoney from "../../../utils/formatMoney";
import { addToCart } from "../../../redux/admin/cartRedux";
import { v4 as uuidv4 } from "uuid";

import { Link, useParams } from "react-router-dom";
import "./product.scss";

import PhoneContact from "../../../components/Users/PhoneContact";
import { useDispatch } from "react-redux";
import { publicRequest } from "../../../redux/slice/requestMethods";

function Product() {
  const params = useParams();
  const producId = params.id;
  const [product, setProduct] = React.useState({});
  const [quantity, setQuantity] = React.useState(1);
  const [color, setColor] = React.useState("");
  const [size, setSize] = React.useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/api/product/find/" + producId);
        setProduct(res.data);
      } catch (error) {}
    };
    getProduct();
  }, [producId]);
  const handleChangeQuantity = (value) => {
    setQuantity(value);
  };
  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity, color, size }));
  };
  return (
    <div className="header--box">
      <Row>
        <Col span={12}>
          <img
            style={{ width: "75%", height: "90%" }}
            src={product.image}
            alt=""
          />
        </Col>
        <Col span={12}>
          <div className="box__right">
            <h2>{product.name}</h2>

            <p className="text-title">MÔ TẢ:</p>
            <p className="text-decoration">{product.desc}</p>
            <p className="price">{formatMoney(product.price)}</p>
            <div className="filter-container">
              <div className="filter">
                <p className="filter-title">Color</p>
                {product.color?.map((c) => {
                  return (
                    <p
                      className="filter-color"
                      style={{ backgroundColor: `${c}` }}
                      key={uuidv4()}
                      onClick={() => setColor(c)}
                    ></p>
                  );
                })}
                <p className="filter-title">Size</p>
                {product.size?.map((c) => {
                  return (
                    <p
                      className="filter-size"
                      key={uuidv4()}
                      onClick={() => setSize(c)}
                    >
                      {c}
                    </p>
                  );
                })}
              </div>
            </div>
            <div className="status">
              <span>Tình trạng: </span>
              {product.inStock ? (
                <span className="status-text">còn hàng</span>
              ) : (
                <span className="status-text">hết hàng</span>
              )}
            </div>
            <div style={{ marginBottom: "10px" }}>
              <InputNumber
                min={1}
                max={10}
                defaultValue={1}
                onChange={handleChangeQuantity}
              />
            </div>
            <div className="contact-box--form--button-wrap">
              <Row>
                <Col span={10}>
                  {product.inStock ? (
                    <Button
                      type="primary"
                      size="large"
                      onClick={handleAddToCart}
                    >
                      Đặt hàng
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      size="large"
                      disabled
                      onClick={addToCart}
                    >
                      Đặt hàng
                    </Button>
                  )}
                </Col>
                <Col span={10} offset={2}>
                  <PhoneContact
                    text={"ĐẶT HÀNG"}
                    numberPhone="0983.418.935"
                    colorText={"#767676"}
                    colorNumber="#898f4b"
                  />
                </Col>
              </Row>
            </div>
            <div className="share">
              <ul>
                <li>Chia sẻ:</li>
                <Link style={{ marginRight: "10px" }} className="link" to="">
                  <FaFacebookF size={18} />
                </Link>
                <Link style={{ marginRight: "10px" }} className="link" to="">
                  <AiOutlineTwitter size={18} />
                </Link>

                <Link style={{ marginRight: "10px" }} className="link" to="">
                  <FaGooglePlusG size={18} />
                </Link>
              </ul>
            </div>
            <p className="line"></p>
            <p className="text-service">
              <strong>Free SHIP</strong> cho đơn hàng lớn hơn 300.000Đ
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Product;
