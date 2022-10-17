import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./styles-sidebar.scss";
import logo from "../../../assets/images/logo.png";
import SidebarItem from "./Sidebar-item";
import { HiOutlineLogout } from "react-icons/hi";
import { persistor } from "../../../redux/store";
import { createBrowserHistory } from "history";

function SideBar({ menu }) {
  const history = createBrowserHistory();

  const location = useLocation();
  const [active, setActive] = useState(1);
  useEffect(() => {
    menu.forEach((element) => {
      if (location.pathname === element.path) {
        setActive(element.id);
      }
    });
  }, [location.pathname]);
  const handleLogout = () => {
    try {
      persistor.purge();
      history.push("/");
      window.location.reload(false);
    } catch (error) {}
  };
  const __navigate = (id) => {
    setActive(id);
  };

  return (
    <div>
      <nav className="sidebar">
        <div className="sidebar-container">
          <div className="sidebar-logo-container">
            <img src={logo} alt="logo" />
          </div>

          <div className="sidebar-container">
            <div className="sidebar-items">
              {menu.map((item, index) => (
                <div key={index} onClick={() => __navigate(item.id)}>
                  <SidebarItem active={item.id === active} item={item} />
                </div>
              ))}
            </div>

            <div className="sidebar-footer" onClick={handleLogout}>
              <p className="sidebar-item-label">Logout</p>
              <p className="icon-logout">
                <HiOutlineLogout />
              </p>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default SideBar;
