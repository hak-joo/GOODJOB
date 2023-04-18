import React, { createContext, useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import SideBar from "@components/sidebar/SideBar";

import Home from "@/views/home/HomeContainer";
import Company from "@/views/company/CompanyContainer";

import { IconType } from "react-icons";
import { AiFillHome } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi";
import { FaSearch } from "react-icons/fa";
import { MdWorkspacesFilled } from "react-icons/md";
import Login from "./views/login/LoginContainer";
import { ViewCardContext } from "./context";
import Register from "./views/register/Register";

interface RouteType {
  path: string;
  name: string;
  element: JSX.Element;
  icon: IconType;
}

export const routes: RouteType[] = [
  {
    path: "/",
    name: "Home",
    element: <Home />,
    icon: AiFillHome,
  },
  {
    path: "/company",
    name: "Company",
    element: <Company />,
    icon: HiUserGroup,
  },
];

export default () => {
  return (
    <BrowserRouter>
      <div className="goodjob-wrapper">
        <SideBar />
        <div className="goodjob-card">
          <Routes>
            {routes.map((route) => {
              return <Route path={route.path} element={route.element} />;
            })}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};
