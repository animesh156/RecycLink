import {  useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    //  Read authentication state from localStorage
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
  
    // if user is not logged in navigate it to login page
    if (!authStatus) navigate("/login");
  }, []);

  return (
    <div className="min-h-screen dark:bg-neutral-800 bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Statistics</h2>
          <p className="text-gray-600">View your activity statistics here</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <p className="text-gray-600">Check your recent activities</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Settings</h2>
          <p className="text-gray-600">Manage your account settings</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
