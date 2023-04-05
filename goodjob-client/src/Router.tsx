import { BrowserRouter, Route, Routes } from "react-router-dom";
import SideBar from "./components/sidebar/SideBar";
import Home from "./containers/home/HomeContainer";
import Company from "./containers/company/CompanyContainer";
import Search from "./containers/search/SearchContainer";
import WorkGroup from "./containers/workgroup/WorkGroupContainer";

import { IconType } from "react-icons";
import { AiFillHome } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi";
import { FaSearch } from "react-icons/fa";
import { MdWorkspacesFilled } from "react-icons/md";

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
  {
    path: "/search",
    name: "Search",
    element: <Search />,
    icon: FaSearch,
  },
  {
    path: "/workgroup",
    name: "WorkGroup",
    element: <WorkGroup />,
    icon: MdWorkspacesFilled,
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
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};
