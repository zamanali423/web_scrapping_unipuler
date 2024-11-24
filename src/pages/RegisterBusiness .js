import React, { useContext, useState } from "react";
import "../css/RegisterBusiness.css";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext/userContext";
import { toast } from "react-toastify";

const RegisterBusiness = () => {
  const [step, setStep] = useState(1);
  const [fill, setFill] = useState(false);
  const { setToken } = useContext(userContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: "",
    categoryName: "",
    startDate: "",
    currency: "",
    logo: "",
    website: "",
    businessContact: "",
    country: "",
    state: "",
    city: "",
    postalCode: "",
    companyDetails: "",
    username: "",
    email: "",
    facebookLink: "",
    instagramLink: "",
    linkedinLink: "",
    youtubeLink: "",
    twitterLink: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleNext = () => {
    if (
      !formData.businessName ||
      !formData.currency ||
      !formData.country ||
      !formData.city ||
      !formData.state ||
      !formData.postalCode
    ) {
      setFill(true);
      return;
    } else {
      if (step < 2) {
        setStep(step + 1);
        setFill(false);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://webscrappingbackend.vercel.app/auth/users/vendor-register",
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

  function convertToBase64(e) {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setFormData({
        ...formData,
        logo: reader.result,
      });
    };
  }
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Register as Business </h2>

      <div className="card p-4 shadow-lg">
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div>
              <h4 className="mb-3">Business Information </h4>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Business Name </label>
                  <input
                    type="text"
                    className="form-control"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    required
                  />
                  <span style={{ color: "red" }}>
                    {fill ? "Fill Required Field" : ""}
                  </span>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Category Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="categoryName"
                    value={formData.categoryName}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Select Currency </label>
                  <select
                    name="currency"
                    id="currency"
                    className="form-control"
                    value={formData.currency}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select Currency
                    </option>
                    <option value="Bangladesh-Taka(BDT)">
                      Bangladesh-Taka(BDT)
                    </option>
                    <option value="United Kingdom-Pound Sterling(GBP)">
                      United Kingdom-Pound Sterling(GBP)
                    </option>
                  </select>
                  <span style={{ color: "red" }}>
                    {fill ? "Fill Required Field" : ""}
                  </span>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Logo</label>
                  <input
                    type="file"
                    className="form-control"
                    name="logo"
                    accept="image/*"
                    onChange={convertToBase64}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Website</label>
                  <input
                    type="url"
                    className="form-control"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Business Contact No</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="businessContact"
                    value={formData.businessContact}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Country</label>
                  <input
                    type="text"
                    className="form-control"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  />
                  <span style={{ color: "red" }}>
                    {fill ? "Fill Required Field" : ""}
                  </span>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">State</label>
                  <input
                    type="text"
                    className="form-control"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                  <span style={{ color: "red" }}>
                    {fill ? "Fill Required Field" : ""}
                  </span>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                  <span style={{ color: "red" }}>
                    {fill ? "Fill Required Field" : ""}
                  </span>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Postal Code</label>
                  <input
                    type="text"
                    className="form-control"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                  />
                  <span style={{ color: "red" }}>
                    {fill ? "Fill Required Field" : ""}
                  </span>
                </div>
                <div className="col-12 mb-3">
                  <label className="form-label">Company Details</label>
                  <textarea
                    className="form-control"
                    name="companyDetails"
                    value={formData.companyDetails}
                    onChange={handleChange}
                    rows="3"
                  />
                </div>
                <span className="text-end fs-6">
                  If you already registered,{" "}
                  <a href="/login" className="sign">
                    Sign In
                  </a>
                </span>
              </div>
              <button
                type="button"
                className="btn btn-primary mt-3"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h4 className="mb-3">Owner Information</h4>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Facebook Link</label>
                  <input
                    type="url"
                    className="form-control"
                    name="facebookLink"
                    value={formData.facebookLink}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Instagram Link</label>
                  <input
                    type="url"
                    className="form-control"
                    name="instagramLink"
                    value={formData.instagramLink}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">LinkedIn Link</label>
                  <input
                    type="url"
                    className="form-control"
                    name="linkedinLink"
                    value={formData.linkedinLink}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">YouTube Link</label>
                  <input
                    type="url"
                    className="form-control"
                    name="youtubeLink"
                    value={formData.youtubeLink}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Twitter Link</label>
                  <input
                    type="url"
                    className="form-control"
                    name="twitterLink"
                    value={formData.twitterLink}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12 mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label">
                      I accept the terms and conditions
                    </label>
                  </div>
                </div>
                <span className="text-end fs-6">
                  If you already registered, <a href="/login">Sign In</a>
                </span>
              </div>
              <button
                type="button"
                className="btn btn-secondary mt-3 me-2"
                onClick={handleBack}
              >
                Back
              </button>
              <button type="submit" className="btn btn-primary mt-3">
                Register
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegisterBusiness;
