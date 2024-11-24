import React, { useContext } from "react";
import Dashboard from "./DashboardContent";
import { userContext } from "../context/userContext/userContext";
import Login from "./Login";
import DashboardHeader from "../components/DashboardHeader";

const Home = () => {
  const { isLogin, token } = useContext(userContext);

  return (
    <>
      {token && isLogin ? (
        <>
          {" "}
          <DashboardHeader />
          <Dashboard />
        </>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Home;
