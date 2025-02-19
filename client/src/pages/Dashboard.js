
import SellerDashboard from "../pages/SellerDashBoard";
import BuyerDashBoard from "../pages/BuyerDashBoard";

const Dashboard = () => {
 

 

  const role = localStorage.getItem("role");

  // Render dashboard based on the user's role
  return (
    <>
      {role === "seller" ? <SellerDashboard /> : <BuyerDashBoard />}
    </>
  );
};

export default Dashboard;
