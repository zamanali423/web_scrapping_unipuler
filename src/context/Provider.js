import React, { useEffect, useState } from "react";
import { userContext } from "./userContext/userContext";
import { Navigate } from "react-router-dom";

const Provider = ({ children }) => {
  const [user, setUser] = useState("");
  const [showSpecificProject, setShowSpecificProject] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const isLogin = !!token;

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    setUser(null);
  };

  //! User
  useEffect(() => {
    const getUser = async () => {
      try {
        const fetchUser = await fetch(
          "https://webscrappingbackend.vercel.app/auth/users/getUser",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        // Check if the response status is 401 (Unauthorized)
        if (fetchUser.status === 401) {
          logout(); // Call logout function
          Navigate("/login"); // Navigate to login page
          return;
        }

        const data = await fetchUser.json();

        // Check if the token has expired
        if (data.msg === "Token Expired. Please log in again.") {
          logout();
          Navigate("/login");
          return;
        }

        setUser(data); // Set the user data if valid response
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };

    // Only call getUser if token exists
    if (token) {
      getUser();
    } else {
      setUser(null); // If no token, clear the user
    }
  }, [token, Navigate]);

  return (
    <userContext.Provider
      value={{
        user,
        token,
        setToken,
        isLogin,
        logout,
        showSpecificProject,
        setShowSpecificProject,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default Provider;
