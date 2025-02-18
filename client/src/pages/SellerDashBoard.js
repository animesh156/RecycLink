import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../utils/api";
import IncomeChart from "../pages/IncomeChart";
import { motion } from "framer-motion";  // Import motion

const SellerDashboard = () => {
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [recycledAmount, setRecycledAmount] = useState(0);
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "Guest";

  const cardAnimation = {
    hidden: { x: -200, opacity: 0 }, // Start off-screen to the left and invisible
    visible: { x: 0, opacity: 1 },   // Move into view and become visible
  };

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const response = await API.get("/total-earnings", { withCredentials: true });
        const earnings = response.data || 0;
        setTotalEarnings(earnings);
        setRecycledAmount(earnings * (1 / 50)); // Adjust recycling logic if needed
      } catch (error) {
        console.error("Error fetching total earnings:", error);
      }
    };

    fetchEarnings();
  }, []);

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Welcome, {userName.toUpperCase()}</h1>
      <IncomeChart />

      <div className="flex flex-wrap gap-y-3 gap-x-2 md:gap-x-6 mt-8 justify-center">
        {/* Animate cards with Framer Motion */}
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={cardAnimation}
          transition={{ duration: 0.5 }}
          className="card dark:bg-neutral-900 w-96 shadow-xl"
        >
          <div className="card-body">
            <h2 className="card-title dark:text-sky-600">Buyers List</h2>
            <p>View and manage buyers interested in your waste listings.</p>
            <div className="card-actions justify-end">
              <button
                className="btn dark:bg-pink-500 dark:hover:bg-pink-600 dark:text-black"
                onClick={() => navigate('/buyers-list')}
              >
                Show List
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={cardAnimation}
          transition={{ duration: 0.5, delay: 0.2 }}  // Slight delay for the second card
          className="card dark:bg-neutral-900 w-96 shadow-xl"
        >
          <div className="card-body">
            <h2 className="card-title dark:text-sky-600">Add Item</h2>
            <p>Sell your waste by adding a new listing.</p>
            <div className="card-actions justify-end">
              <button
                className="btn dark:bg-pink-500 dark:hover:bg-pink-600 dark:text-black"
                onClick={() => navigate('/add-waste')}
              >
                Add Now
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={cardAnimation}
          transition={{ duration: 0.5, delay: 0.4 }}  // Slight delay for the third card
          className="card dark:bg-neutral-900 w-96 shadow-xl"
        >
          <div className="card-body">
            <h2 className="card-title dark:text-sky-600">Recycle Insights</h2>
            <p>Track your recycling progress and impact!</p>
            <div className="card-actions justify-end">
              <button
                className="btn dark:bg-pink-500 dark:hover:bg-pink-600 dark:text-black"
                onClick={() => navigate('/recycle-insights', { state: { totalEarnings, recycledAmount } })}
              >
                Show Insights
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default SellerDashboard;
