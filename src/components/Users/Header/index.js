import { Badge, Col, Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { AiOutlineShoppingCart, AiOutlineLogin } from "react-icons/ai";
import { AiOutlineCaretDown } from "react-icons/ai";
import { Dropdown, Menu, Space } from "antd";
import { GiArchiveRegister } from "react-icons/gi";

import { publicRoutes } from "../../../constants/headerRoutes";
import PhoneContact from "../PhoneContact";
import SearchForm from "../SearchForm";
import { useNavigate } from "react-router-dom";
import { createBrowserHistory } from "history";

import "./header.scss";
import Home from "../../../pages/admin";
import { persistor } from "../../../redux/store";
function HeaderClient() {
  const [toggle, setToggle] = React.useState(false);
  const navigate = useNavigate();
  const history = createBrowserHistory();

  const user = useSelector((state) => state.user.currentUser);
  const quantity = useSelector((state) => state.cart.quantity);
  const handleLogout = () => {
    try {
      persistor.purge();
      history.push("/");
      window.location.reload(false);
    } catch (error) {}
  };
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <a href="#" onClick={handleLogout}>
              Đăng Xuất
            </a>
          ),
        },
      ]}
    />
  );
  return (
    <div>
      <header className="header">
        <div>
          <Row>
            <Col span={3} offset={1}>
              <div className="header__logo">
                <Link to="/">
                  <img
                    src={require("../../../assets/images/logo.jpg")}
                    alt=""
                  />
                </Link>
              </div>
            </Col>
            <Col span={10}>
              {" "}
              <nav className="header__nav">
                <ul>
                  {publicRoutes.map((item) => {
                    return (
                      <li key={item.id}>
                        <Link to={item.path}>{item.content}</Link>
                      </li>
                    );
                  })}
                  <li>
                    <p
                      onClick={() => {
                        setToggle((s) => !s);
                        console.log(toggle);
                      }}
                      className="icon-search"
                    >
                      <img
                        src={require("../../../assets/images/search-icon.png")}
                        className="header--search-icon"
                        alt=""
                      />
                    </p>
                    {toggle ? <SearchForm /> : null}
                  </li>
                </ul>
              </nav>
            </Col>
            <Col span={6}>
              <div className="cart-box">
                {user && user.isAdmin ? null : (
                  <Link to="/cart">
                    <Badge count={quantity} size={"default"}>
                      <AiOutlineShoppingCart size={19} />
                    </Badge>
                  </Link>
                )}
                {user && user.isAdmin ? (
                  <Navigate to={"/admin"} replace />
                ) : user ? (
                  <div>
                    Xin chào, {user.username} !
                    <span>
                      <Dropdown overlay={menu}>
                        <a onClick={(e) => e.preventDefault()}>
                          <Space>
                            <AiOutlineCaretDown />
                          </Space>
                        </a>
                      </Dropdown>
                    </span>
                  </div>
                ) : (
                  <div>
                    <Link to="/login">
                      <p>
                        <AiOutlineLogin /> Đăng nhập
                      </p>
                    </Link>
                    <Link to="/register">
                      <p>
                        <GiArchiveRegister /> Đăng kí
                      </p>
                    </Link>
                  </div>
                )}
              </div>
            </Col>
            <Col span={4}>
              {" "}
              <PhoneContact
                text={"HOTLINE 24/7"}
                numberPhone="090.154.8866"
                colorText={"#767676"}
                colorNumber="#898f4b"
              />
            </Col>
          </Row>
        </div>
      </header>
    </div>
  );
}

export default HeaderClient;
