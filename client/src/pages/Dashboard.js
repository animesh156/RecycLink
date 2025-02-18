import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SellerDashboard from "./SellerDashBoard";
import BuyerDashBoard from "./BuyerDashBoard";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    //  Read authentication state from localStorage
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    // if user is not logged in navigate it to login page
    if (!authStatus) navigate("/login");
  }, []);

  
  const role = localStorage.getItem("role") || "buyer";

  if(role === "seller") return <SellerDashboard />

  return (
   <BuyerDashBoard />
  );
};

export default Dashboard;
