import { Button, Card } from "antd";
import React from "react";
import { BsCartPlus } from "react-icons/bs";
import { Link } from "react-router-dom";
import formatMoney from "../../../utils/formatMoney";
import "./productCart.scss";
function ProductCart({ item }) {
  return (
    <div className="block-product">
      <Link to={`/product/${item._id}`}>
        <Card hoverable>
          <p className="img">
            <img src={item.image} alt="" />
          </p>
          <p className="name">
            <span>{item.name}</span>
            <span>{formatMoney(item.price)}</span>
          </p>
          <p className="add-cart">
            <span>{item.category}</span>
            <span>
              <Button type="primary" danger icon={<BsCartPlus />}>
                Add to cart
              </Button>
            </span>
          </p>
        </Card>
      </Link>
    </div>
  );
}

export default ProductCart;
