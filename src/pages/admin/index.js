import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import DashboardHeader from "../../components/Admin/DashboardHeader";
import SideBar from "../../components/Admin/Sidebar";
import sidebar_menu from "../../constants/sidebarMenu";
import { history } from "../../redux/store";
import "./styles.scss";
function Home() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <React.Fragment>
      <div className="dashboard-container">
        <SideBar menu={sidebar_menu} />

        <div className="dashboard-body">
          <DashboardHeader />

          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
