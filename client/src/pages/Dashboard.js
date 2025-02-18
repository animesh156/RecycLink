import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SellerDashboard from "../pages/SellerDashBoard";
import BuyerDashBoard from "../pages/BuyerDashBoard";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Read authentication state from localStorage
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
  
    // If user is not logged in, navigate to the login page
    if (!authStatus) navigate("/login");
  }, [navigate]);

  const role = localStorage.getItem("role");

  // Render dashboard based on the user's role
  return (
    <>
      {role === "seller" ? <SellerDashboard /> : <BuyerDashBoard />}
    </>
  );
};

export default Dashboard;
