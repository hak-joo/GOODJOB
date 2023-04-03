import React from "react";
import "./index.css";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { toggleSidebar } from "../../store/reducers/sidebar";

import { HiUserCircle } from "react-icons/hi";
import { MdOutlineNavigateBefore } from "react-icons/md";

const SideBar = () => {
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);
  const dispatch = useDispatch<AppDispatch>();

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };
  return (
    <div className={`sidebar-cont ${isOpen ? "open" : "close"}`}>
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
