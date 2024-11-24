import React, { useState } from "react";
import "../../css/adminSidebar.css";
import Home from "../../pages/Home";
import Navbar from "../../components/Navbar";
import Leads from "./../../pages/Leads";
import { Link, useLocation } from "react-router-dom";
import Projects from "../../pages/Projects";
import SpecificLeads from "../../pages/SpecificLeads";
import ProfilePage from "../../pages/ProfilePage";

const AdminSidebar = () => {
  const location = useLocation();
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link
              to="/"
              className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 d-none d-sm-inline">Unipuler</span>
            </Link>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="nav-item">
                <Link to="/" className="nav-link align-middle px-0">
                  <i className="fs-4 bi-house"></i>{" "}
                  <span className="ms-1 d-sm-inline">Home</span>
                  {/* <span className="ms-1 d-none d-sm-inline">Home</span> */}
                </Link>
              </li>
              <li>
                <Link
                  to="#submenu1"
                  data-bs-toggle="collapse"
                  className="nav-link px-0 align-middle"
                >
                  <i className="fs-4 bi-speedometer2"></i>{" "}
                  <span className="ms-1 d-sm-inline">Leads</span>{" "}
                </Link>
                <ul
                  className="collapse show nav flex-column ms-1"
                  id="submenu1"
                  data-bs-parent="#menu"
                >
                  <li className="w-100">
                    <Link to="/projects" className="nav-link px-0">
                      {" "}
                      <span className=" d-sm-inline">Projects</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/leads" className="nav-link px-0">
                      {" "}
                      <span className=" d-sm-inline">All Leads</span>
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <Link
                  to="#submenu2"
                  data-bs-toggle="collapse"
                  className="nav-link px-0 align-middle "
                >
                  <i className="fs-4 bi-bootstrap"></i>{" "}
                  <span className="ms-1  d-sm-inline">Property</span>
                </Link>
                <ul
                  className="collapse nav flex-column ms-1"
                  id="submenu2"
                  data-bs-parent="#menu"
                >
                  <li className="w-100">
                    <Link to="/projects" className="nav-link px-0">
                      {" "}
                      <span className=" d-sm-inline">Projects</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="nav-link px-0">
                      {" "}
                      <span className=" d-sm-inline">All Property</span>
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link
                  to="#submenu3"
                  data-bs-toggle="collapse"
                  className="nav-link px-0 align-middle"
                >
                  <i className="fs-4 bi-grid"></i>{" "}
                  <span className="ms-1  d-sm-inline">Jobs</span>{" "}
                </Link>
                <ul
                  className="collapse nav flex-column ms-1"
                  id="submenu3"
                  data-bs-parent="#menu"
                >
                  <li className="w-100">
                    <Link to="/projects" className="nav-link px-0">
                      {" "}
                      <span className=" d-sm-inline">Projects</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="nav-link px-0">
                      {" "}
                      <span className=" d-sm-inline">All Jobs</span>
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <Link
                  to="#submenu2"
                  data-bs-toggle="collapse"
                  className="nav-link px-0 align-middle "
                >
                  <i className="fs-4 bi-bootstrap"></i>{" "}
                  <span className="ms-1  d-sm-inline">News</span>
                </Link>
                <ul
                  className="collapse nav flex-column ms-1"
                  id="submenu2"
                  data-bs-parent="#menu"
                >
                  <li className="w-100">
                    <Link to="#" className="nav-link px-0">
                      {" "}
                      <span className=" d-sm-inline">Projects</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="nav-link px-0">
                      {" "}
                      <span className=" d-sm-inline">All News</span>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            {/* <hr /> */}
            <div className="dropdown pb-4">
              <Link
                to="#"
                className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                id="dropdownUser1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1731476204~exp=1731479804~hmac=15e2ccb315e2078a717ce89cac5f250f0e276a29da4cd209cc2576ac53a41354&w=740"
                  alt="hugenerd"
                  width="30"
                  height="30"
                  className="rounded-circle"
                />
                <span className="d-none d-sm-inline mx-1">User</span>
              </Link>
              <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                <li>
                  <Link className="dropdown-item" to="/user-profile">
                    Profile
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col py-3">
          {location.pathname === "/" ? (
            <Home />
          ) : location.pathname === "/projects" ? (
            <Projects />
          ) : location.pathname === "/leads" ? (
            <Leads />
          ) : location.pathname === "/specificleads" ? (
            <SpecificLeads />
          ) : location.pathname === "/user-profile" ? (
            <ProfilePage />
          ) : null}
          {/* location.pathname==="/jobs"?<Jobs />:
              location.pathname==="/news"?<News />:
              location.pathname==="/properties"?<Properties />: */}
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
