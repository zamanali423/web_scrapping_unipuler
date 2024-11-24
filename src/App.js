import React, { useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { userContext } from "./context/userContext/userContext";
import AdminSidebar from "./admin/adminPages/AdminSideBar";
import RegisterBusiness from "./pages/RegisterBusiness ";
import Navbar from "./components/Navbar";

function App() {
  const { isLogin, token } = useContext(userContext);

  return (
    <Router>
      {token && isLogin ? (
        <>
          <Navbar />
          <AdminSidebar />
        </>
      ) : null}

      <Routes>
        {token && isLogin ? (
          <>
            {/* <Route path="/" element={<AdminSidebar />} /> */}
            {/* <Route path="/projects" element={<Projects />} />
            <Route path="/leads" element={<Leads />} /> */}
            {/* <Route path="/dashboard" element={<AdminDashboard />} /> */}
          </>
        ) : (
          <>
            <Route path={`${isLogin ? "/login" : "*"}`} element={<Login />} />
            <Route path="/register-admin" element={<Register />} />
            <Route path="/register-customer" element={<RegisterBusiness />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
