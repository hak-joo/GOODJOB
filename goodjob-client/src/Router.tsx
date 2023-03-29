import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./containers/home/HomeContainer";
import SideBar from "./components/sidebar/SideBar";
import ViewCard from "./components/viewcard/ViewCard";

export default () => {
  return (
    <BrowserRouter>
      <div className="goodjob-wrapper">
        <SideBar />
        <div className="goodjob-card">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};
