import React, { useContext, useState } from "react";
import "../css/profilePage.css";
import { userContext } from "../context/userContext/userContext";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setisLoading] = useState(false);
  const { user } = useContext(userContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);
    try {
      if (!formData.username || !formData.email || !formData.password) {
        toast.error("All fields are required");
        return;
      }

      const response = await fetch(
        `https://webscrappingbackend.vercel.app/auth/users/updateUserProfile/${encodeURIComponent(
          user.user?.email
        )}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.msg || "Failed to update profile");
        setisLoading(false);
        return;
      }
      toast.success("Profile updated successfully");
      setisLoading(false);
      setFormData({
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Error updating profile:", error.message);
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="profile_main_container">
      <div className="profile-container">
        <div className="profile-card">
          <h2 className="profile-title">Update Your Profile</h2>
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Enter your username"
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
