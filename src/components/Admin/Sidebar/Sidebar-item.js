import React from "react";
import { Link, Outlet } from "react-router-dom";

function SidebarItem({ item, active }) {
  const [hover, setHover] = React.useState(false);

  return (
    <div>
      <Link
        to={item.path}
        className={active ? "sidebar-item-active" : "sidebar-item"}
      >
        <img
          src={item.icon}
          alt={`icon-${item.icon}`}
          className="sidebar-item-icon"
        />
        <span className="sidebar-item-label">{item.title}</span>
      </Link>
    </div>
  );
}

export default SidebarItem;
