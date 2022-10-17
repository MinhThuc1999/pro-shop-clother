import React, { useEffect } from "react";
import "./productList.scss";
import { Button, Card, Col, Row } from "antd";
import { BsCartPlus } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";

import axios from "axios";
import ProductCart from "../../../components/Users/Products/ProductCart";

function ProductList({ cat, filters, sort }) {
  const [products, setProducts] = React.useState([]);
  const [filteredProducts, setFilteredProducts] = React.useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:3001/api/products?category=${cat}`
            : "http://localhost:3001/api/products?category"
        );
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [cat]);
  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) => {
          return Object.entries(filters).every(([key, value]) => {
            return item[key].includes(value);
          });
        })
      );
  }, [products, cat, filters]);
  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);
  return (
    <div className="product-container">
      <div className="product-content">
        <Row>
          {cat
            ? filteredProducts.map((item) => (
                <ProductCart item={item} key={uuidv4()} />
              ))
            : products.slice(0, 8).map((item) => {
                return (
                  <Col span={8} key={uuidv4()}>
                    <ProductCart item={item} />
                  </Col>
                );
              })}
        </Row>
      </div>
    </div>
  );
}

export default ProductList;
