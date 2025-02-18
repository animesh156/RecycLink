import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";  // Import motion

const RecyclingContribution = () => {
  const location = useLocation();
  const { totalEarnings, recycledAmount } = location.state || { totalEarnings: 0, recycledAmount: 0 };
  const role = localStorage.getItem("role");

  // Calculate progress percentage
  const progressPercentage = Math.min((recycledAmount / 500) * 100, 100).toFixed(1);

  // Animation settings for the card
  const cardAnimation = {
    hidden: { x: -200, opacity: 0 }, // Start off-screen to the left and invisible
    visible: { x: 0, opacity: 1 },   // Move into view and become visible
  };

  // Check if there's no data to show
  const isDataAvailable = totalEarnings > 0 || recycledAmount > 0;

  return (
    <div className="flex items-center justify-center h-screen">
      {isDataAvailable ? (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={cardAnimation}
          transition={{ duration: 0.5, delay: 0.2 }}  
          className="card dark:bg-neutral-900 shadow-2xl p-8 w-full max-w-lg text-center"
        >
          <h2 className="text-2xl text-center font-bold">Your Recycling Contribution</h2>
          <p className="text-lg text-gray-700 dark:text-pink-400 mt-4">
            Total {role === "seller" ? "Earning" : "Spent"}: <strong className="text-xl">${totalEarnings}</strong>
          </p>
          <p className="text-lg text-green-600">
            Recycled Waste: <strong className="text-xl">{recycledAmount.toFixed(2)} kg</strong>
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-gray-300 rounded-full h-6 mt-6 relative overflow-hidden">
            <div
              className="bg-green-500 h-6 rounded-full text-black flex items-center justify-center font-bold text-sm transition-all duration-500"
              style={{
                width: `${progressPercentage}%`,
                minWidth: "40px", // Ensures the text is visible even for small percentages
              }}
            >
              {progressPercentage}%
            </div>
          </div>

          <p className="text-md text-gray-500 mt-4">
            Keep selling to increase your impact on recycling! 🌍♻️
          </p>
        </motion.div>
      ) : (
        <div className="text-center text-xl text-gray-700 dark:text-pink-400">
          <p>Nothing to show here. Buy or Sell something to get your Recycle Insights!</p>
        </div>
      )}
    </div>
  );
};

export default RecyclingContribution;
