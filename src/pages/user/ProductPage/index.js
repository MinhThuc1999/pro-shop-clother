import { Col, Row } from "antd";
import React from "react";
import { Link, useParams } from "react-router-dom";
import ProductList from "../Products";
import { AiOutlineFilter } from "react-icons/ai";

import "./productPage.scss";
function ProductPage() {
  const params = useParams();
  const cat = params.category;
  const [filters, setFilters] = React.useState({});
  const [sort, setSort] = React.useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value.toLowerCase(),
    });
    console.log(value);
    console.log(filters);
  };
  console.log(sort);
  return (
    <div className="container">
      <h1 style={{ textAlign: "center", fontWeight: "600", fontSize: "30px" }}>
        {cat}
      </h1>
      <div className="filter">
        <Row>
          <Col span={10}>
            <div className="filter-left">
              <span> {<AiOutlineFilter size={"25px"} />}</span>
              <p>
                <select name="color" onChange={handleFilters}>
                  <option disabled>Color</option>
                  <option value={"white"}>white</option>
                  <option value={"black"}>black</option>
                  <option value={"gold"}>gold</option>
                  <option value={"silver"}>silver</option>
                  <option value={"blue"}>blue</option>
                  <option value={"brown"}>brown</option>
                </select>
              </p>
              <p>
                <select name="size" onChange={handleFilters}>
                  <option disabled>Size</option>
                  <option value={"XS"}>XS</option>
                  <option value={"S"}>S</option>
                  <option value={"M"}>M</option>
                  <option value={"L"}>L</option>
                  <option value={"XL"}>XL</option>
                </select>
              </p>
            </div>
          </Col>
          <Col span={5} offset={7}>
            <div className="filter-right">
              <p>
                {" "}
                <span style={{}}> {<AiOutlineFilter size={"25px"} />} </span>
                <select onChange={(e) => setSort(e.target.value)}>
                  <option value={"newest"}>mới nhất</option>
                  <option value={"asc"}>giá giảm dần</option>
                  <option value={"desc"}>giá tăng dần</option>
                </select>
              </p>
            </div>
          </Col>
        </Row>
      </div>
      <div className="product-list">
        <ProductList cat={cat} filters={filters} sort={sort} />
      </div>
    </div>
  );
}

export default ProductPage;
