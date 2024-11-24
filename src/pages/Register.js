import React, { useContext, useState } from "react";
import "../css/Register.css"; // Custom styles, if needed
import { userContext } from "../context/userContext/userContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const { setToken } = useContext(userContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://webscrappingbackend.vercel.app/auth/users/admin-register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        toast(data.msg);
        return;
      }
      localStorage.setItem("token", data.token);
      setToken(data.token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <form
        className="card p-4 w-100"
        style={{ maxWidth: "500px" }}
        onSubmit={handleSubmit}
      >
        <h2 className="text-center mb-4">Register as Admin</h2>
        <div className="row mb-3">
          <div className="col-md-6 mb-3 mb-md-0">
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Username *"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email *"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        {/* <div className="row mb-3">
          <div className="col-md-6 mb-3 mb-md-0">
            <input
              type="text"
              name="phoneNumber"
              className="form-control"
              placeholder="Phone Number *"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              name="address"
              className="form-control"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
        </div> */}
        {/* <div className="row mb-3">
          <div className="col-md-6 mb-3 mb-md-0">
            <input
              type="text"
              name="city"
              className="form-control"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              name="state"
              className="form-control"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
            />
          </div>
        </div> */}
        {/* <div className="row mb-3">
          <div className="col-md-6 mb-3 mb-md-0">
            <input
              type="text"
              name="country"
              className="form-control"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              name="zipCode"
              className="form-control"
              placeholder="Zip Code"
              value={formData.zipCode}
              onChange={handleChange}
            />
          </div>
        </div> */}
        <div className="row mb-3">
          <div className="col-md-6 mb-3 mb-md-0">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password *"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              placeholder="Confirm Password *"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <p className="text-center">
          If you already registered,{" "}
          <a href="/login" className="sign">
            Sign In
          </a>
        </p>
        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
