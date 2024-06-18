/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import style from "./Sidebar.module.css";
import { useContext } from "react";
import { SmartAIContext } from "../../store/MyContextProvider"; // Assuming SmartAIContext is exported from MyContextProvider

const Sidebar = ({ isSidebarOpen }) => {
  const location = useLocation();
  const { allChats } = useContext(SmartAIContext); // Use SmartAIContext to access context data
  return (
    <div
      className={`border-right ${isSidebarOpen ? "" : style.isClose}`}
      id={style.sidebarWrapper}
    >
      <div className="">
        {allChats.map((chat) => (
          <Link
            key={chat.id}
            to={`/chat/${chat.id}`}
            className={`${style.linkContainer} d-flex ${
              location.pathname === `/chat/${chat.id}` ? style.active : ""
            }`}
          >
            <span className={`${style.linkContent}`}>{chat.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
