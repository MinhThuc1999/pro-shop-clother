import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Users/Footer";
import HeaderClient from "../../components/Users/Header";
import SliderCarousel from "../../components/Users/Slider";
import { useParams, useLocation } from "react-router-dom";
import { BackTop } from "antd";

import "./styleClient.scss";
import ProductList from "./Products";
import Categories from "./Category";
function HomeClient() {
  const location = useLocation();
  const style = {
    height: 40,
    width: 40,
    lineHeight: "40px",
    borderRadius: 4,
    backgroundColor: "#1088e9",
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
  };
  return (
    <div>
      <HeaderClient />
      {location.pathname === "/" ? <SliderCarousel /> : null}
      {location.pathname === "/" ? <Categories /> : null}
      {location.pathname === "/" ? (
        <div
          style={{ textAlign: "center", fontWeight: "600", fontSize: "35px" }}
        >
          {" "}
          Sản phẩm nổi bật
        </div>
      ) : null}

      {location.pathname === "/" ? <ProductList /> : null}
      <BackTop>
        <div style={style}>TOP</div>
      </BackTop>
      <Outlet />

      <Footer />
    </div>
  );
}

export default HomeClient;
