import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import { motion } from "framer-motion";

const user = localStorage.getItem("userName");

function BuyerDashBoard() {
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [recycledAmount, setRecycledAmount] = useState(0);

  const cardAnimation = {
    hidden: { x: -200, opacity: 0 }, // Start off-screen to the left and invisible
    visible: { x: 0, opacity: 1 },   // Move into view and become visible
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const response = await API.get("/buyer/history", { withCredentials: true });
        console.log(response.data.purchasedItems);

        // Summing up all prices from the purchasedItems array
        const total = response.data.purchasedItems.reduce((acc, item) => acc + item.price, 0);

        // Setting total earnings
        setTotalEarnings(total);

        // Calculating the recycledAmount based on the earnings (adjust logic if needed)
        setRecycledAmount(total * (1 / 50)); // Adjust the divisor for your desired formula

      } catch (error) {
        console.error("Error fetching total earnings:", error);
      }
    };

    fetchEarnings();
  }, []);

  return (
    <div className="h-screen">
      <h1 className="text-center text-2xl mt-8">
        Welcome, <span className="uppercase text-sky-400 font-bold">{user}</span>
      </h1>

      <div className="flex flex-wrap gap-y-3 gap-x-2 md:gap-x-6 md:mt-28 mt-8 justify-center">
        {/* Animate cards with Framer Motion */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={cardAnimation}
          transition={{ duration: 0.5 }}
          className="card dark:bg-neutral-900 w-96 shadow-xl"
        >
          <div className="card-body">
            <h2 className="card-title dark:text-sky-600">Purchased Items</h2>
            <p>View your purchased items</p>

            <div className="card-actions justify-end">
              <button
                className="btn dark:bg-pink-500 dark:text-black dark:hover:bg-pink-600"
                onClick={() => navigate('/history')}
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
}

export default BuyerDashBoard;
