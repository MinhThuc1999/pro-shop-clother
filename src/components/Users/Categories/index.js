import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "./categoryItem.scss";
function CategoryItem({ item }) {
  return (
    <div
      className="categoryItem-container"
      style={{ backgroundImage: `url(${item.img})` }}
    >
      <Link to={`/products/${item.cat}`}>
        <p className="category-title">{item.title}</p>
        <p>
          <Button type="primary" danger>
            SHOP NOW
          </Button>
        </p>
      </Link>
    </div>
  );
}

export default CategoryItem;
