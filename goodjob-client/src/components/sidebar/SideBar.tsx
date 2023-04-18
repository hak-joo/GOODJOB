import React from "react";
import "./index.scss";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { toggleSidebar } from "@/store/reducers/sidebar";

import { HiUserCircle } from "react-icons/hi";

import { MdOutlineNavigateBefore, MdThumbUp } from "react-icons/md";
import { routes } from "@/Router";
import { Navigate, useNavigate } from "react-router-dom";

const SideBar = () => {
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);
  const dispatch = useDispatch<AppDispatch>();

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };
  const navigate = useNavigate();
  const navigateToPath = (path: string) => {
    navigate(path);
  };
  return (
    <div className={`sidebar-container ${isOpen ? "open" : "close"}`}>
      <div className="sidebar-logo">
        <MdThumbUp className="logo-image" />
        {isOpen ? <span className="logo-text"> GOOD JOB</span> : null}
      </div>
      <span className="sidebar-title">MENU</span>
      <div className={`sidebar-menus`}>
        {routes.map((route) => {
          const Icon = route.icon;
          return (
            <div
              className={`sidebar-menu ${isOpen ? "open" : "close"}`}
              onClick={() => navigateToPath(route.path)}
            >
              <Icon color="green" className="menu-icon" />
              {isOpen ? <span className="menu-title">{route.name}</span> : null}
            </div>
          );
        })}
      </div>

      <div className={`sidebar-settings`}></div>

      <div className="sidebar-toggle" onClick={handleToggleSidebar}>
        <MdOutlineNavigateBefore
          className={`sidebar-toggle-button ${isOpen ? "open" : "close"}`}
        />
      </div>

      <div className={`sidebar-user-info`}>
        <HiUserCircle className="img-large" />
        {isOpen ? <span className={`user-name`}>이학주 님</span> : null}
      </div>
    </div>
  );
};

export default SideBar;
