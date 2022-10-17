import { Col, Row } from "antd";
import React from "react";
import CategoryItem from "../../../components/Users/Categories";
import { categories } from "../../../constants/data";
import "./category.scss";
function Categories() {
  return (
    <div className="category-container">
      <Row>
        {categories.map((item) => {
          return (
            <Col span={12} key={item.id}>
              <CategoryItem item={item} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default Categories;
