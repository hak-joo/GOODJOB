import React, { ReactNode } from "react";
import "./index.scss";

interface CardLayoutProps {
  children: ReactNode;
}
const ViewCard = ({ children }: CardLayoutProps) => {
  return <div className="card-container">{children}</div>;
};

export default ViewCard;
