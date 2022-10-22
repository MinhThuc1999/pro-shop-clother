import { Col, Modal, Row } from "antd";
import React from "react";
import moment from "moment";

import vi from "moment/locale/vi";

import formatMoney from "../../../../utils/formatMoney";
import "./order.scss";
function ModelDetailOrder({ toggleHideDetail, currentOrder }) {
  console.log(currentOrder);
  const newVi = moment(currentOrder.createdAt)
    .locale("vi", vi)
    .format("dddd D, MMMM");

  console.log(newVi);
  return (
    <div>
      <Modal
        title="Order Detail"
        open={true}
        onOk={toggleHideDetail}
        onCancel={toggleHideDetail}
      >
        <div className="order-container">
          <h1 className="title">
            Order Details,{" "}
            <span className="strong-text">{currentOrder.user.username}!</span>
          </h1>

          <div className="order-content">
            {currentOrder.orderDetails.map((item, index) => {
              return (
                <div className="product-item" key={index}>
                  <Row>
                    <Col span={5}>
                      <img
                        style={{ width: "50px", height: "45px" }}
                        src={item.image}
                        alt=""
                      />
                    </Col>
                    <Col span={7}>
                      <p>{item.name}</p>
                    </Col>
                    <Col span={5}>
                      <p>Quantity: {item.qty}</p>
                    </Col>
                    <Col span={5}>
                      <p>total: {formatMoney(item.price)} </p>
                    </Col>
                  </Row>
                </div>
              );
            })}

            <div className="order-address">
              <Row>
                <Col span={5}>
                  {" "}
                  <p className="strong-text">Địa chỉ</p>
                </Col>
                <Col span={14}>
                  <p>
                    <span className="strong-text">wards: </span>
                    <span>{currentOrder.address.line1}</span>
                  </p>
                  <p>
                    <span className="strong-text">country: </span>
                    <span>{currentOrder.address.country}</span>
                  </p>
                  <p>
                    <span className="strong-text">city: </span>
                    <span>{currentOrder.address.city}</span>
                  </p>
                </Col>
              </Row>
            </div>
            <div className="order-bottom">
              <Row>
                <Col span={12}>
                  <p>
                    <span className="strong-text">PaymentMethod: </span>
                    <span>{currentOrder.paymentMethod}</span>
                  </p>
                  <p>
                    <span className="strong-text">Created At: </span>
                    <span>{newVi}</span>
                  </p>
                </Col>
                <Col span={10}>
                  <p>
                    <span className="strong-text">TOTAL PAID: </span>
                    <span>{formatMoney(currentOrder.amount)}</span>
                  </p>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModelDetailOrder;
