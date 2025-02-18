import {  useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BuyerDashBoard from "./BuyerDashBoard";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    //  Read authentication state from localStorage
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
  
    // if user is not logged in navigate it to login page
    if (!authStatus) navigate("/login");
  }, []);

  return (
   <BuyerDashBoard />
  );
};

export default Dashboard;
