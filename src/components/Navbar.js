// components/Navbar.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../context/userContext/userContext";

const Navbar = () => {
  const { isLogin, token, logout } = useContext(userContext);
  const LogOut = () => {
    logout();
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <span className="navbar-brand">Unipuler Multivendor</span>
        {token && isLogin ? (
          <button className="btn btn-outline-light ms-auto" onClick={LogOut}>
            Logout
          </button>
        ) : (
          <Link to="/login" className="btn btn-outline-light ms-auto">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
