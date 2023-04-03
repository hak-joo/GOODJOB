import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.css";
import "./assets/global.css";
import "./assets/reset.css";
import { useLocation, useMatch } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<App />);
