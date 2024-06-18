/* eslint-disable react/prop-types */

import { FaBars, FaUserCircle } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";

import style from "./Header.module.css";
import { useNavigate } from "react-router-dom";

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light bg-light `}
      id={style.header}
    >
      <div className="container-fluid">
        <button
          onClick={toggleSidebar}
          className="btn"
          type="button"
          title="Open Sidebar"
        >
          <FaBars size={24} />
        </button>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="btn"
          type="button"
          title="New Chat"
        >
          <BsPencilSquare size={24} />
        </button>

        <span className="navbar-brand mx-auto">SmartAI</span>
        <div className="d-flex align-items-center">
          <FaUserCircle size={24} />
        </div>
      </div>
    </nav>
  );
};

export default Header;
