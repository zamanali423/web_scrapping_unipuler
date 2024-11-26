import React, { useContext, useState } from "react";
import "../css/login.css";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext/userContext";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setisLoading] = useState(false);
  const { setToken } = useContext(userContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);
    try {
      const res = await fetch("https://webscrappingbackend.vercel.app/auth/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        toast(data.msg);
        setisLoading(false);
        return;
      }
      localStorage.setItem("token", data.token);
      setToken(data.token);
      toast(data.msg);
      navigate("/");
      setisLoading(false);
    } catch (error) {
      console.log(error);
      setisLoading(false);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      {/* Section for registration options */}
      <div className="mb-4 text-center">
        <p className="mb-2">Not yet registered?</p>
        <div className="d-flex justify-content-center gap-3">
          <a href="/register-admin" className="btn btn-outline-primary">
            Login as Admin
          </a>
          <a href="/register-customer" className="btn btn-outline-secondary">
            Register as Business
          </a>
        </div>
      </div>

      {/* Login Form */}
      <div
        className="card p-4 shadow"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
           {isLoading ? "Loging..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
