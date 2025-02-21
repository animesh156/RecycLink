import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../utils/api";
import IncomeChart from "../pages/IncomeChart";
import { motion, AnimatePresence } from "framer-motion";

const SellerDashboard = () => {
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [recycledAmount, setRecycledAmount] = useState(0);
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "Guest";

  const titleAnimation = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardAnimation = {
    hidden: { 
      y: 50,
      opacity: 0,
      scale: 0.9
    },
    visible: { 
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 300
      }
    }
  };

  const AnimatedBackground = () => (
    <svg
      className="absolute inset-0 w-full h-full opacity-5"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="grid"
          width="30"
          height="30"
          patternUnits="userSpaceOnUse"
        >
          <motion.path
            d="M 30 0 L 0 0 0 30"
            fill="none"
            stroke="rgba(37, 99, 235, 0.5)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ 
              pathLength: 1,
              transition: { 
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear"
              }
            }}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const response = await API.get("/total-earnings", { withCredentials: true });
        const earnings = response.data || 0;
        setTotalEarnings(earnings);
        setRecycledAmount(earnings * (1 / 50));
      } catch (error) {
        console.error("Error fetching total earnings:", error);
      }
    };

    fetchEarnings();
  }, []);

  return (
    <AnimatePresence>
      <div className="min-h-screen  p-6 relative overflow-hidden flex flex-col justify-center">
        <AnimatedBackground />
        
        <motion.h1 
          initial="hidden"
          animate="visible"
          variants={titleAnimation}
          className="text-center md:text-4xl mb-6 text-blue-900 font-light tracking-wide relative mt-10 z-10"
        >
          Welcome, {' '}
          <motion.span 
            className="text-blue-600 font-bold uppercase"
            whileHover={{ scale: 1.05 }}
          >
            {userName}
          </motion.span>
        </motion.h1>

        <div className="relative z-10 mb-8">
          <IncomeChart />
        </div>

        <motion.div 
  variants={containerAnimation}
  initial="hidden"
  animate="visible"
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center items-center max-w-7xl mx-auto relative z-10"
>
  <motion.div
    variants={cardAnimation}
    whileHover="hover"
    className="card bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 w-full md:w-96 h-64 sm:h-72 shadow-xl border border-blue-300/30 rounded-xl overflow-hidden flex flex-col"
  >
    <div className="card-body p-6 flex flex-col h-full">
      <h2 className="card-title text-blue-300 text-lg md:text-xl font-bold text-center">Buyers List</h2>
      <p className="text-gray-100 text-sm md:text-lg text-center">TView and manage buyers interested in your waste listings</p>
      <div className="card-actions justify-center mt-auto">
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: '#2563EB' }}
          whileTap={{ scale: 0.95 }}
          className="btn bg-blue-600 text-white hover:bg-blue-700 border-none px-6 py-2 rounded-lg shadow-lg text-sm md:text-base"
          onClick={() => navigate('/buyers-list')}
        >
          View History
        </motion.button>
      </div>
    </div>
  </motion.div>

  <motion.div
    variants={cardAnimation}
    whileHover="hover"
    className="card bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 w-full md:w-96 h-64 sm:h-72 shadow-xl border border-blue-300/30 rounded-xl overflow-hidden flex flex-col"
  >
    <div className="card-body p-6 flex flex-col h-full">
      <h2 className="card-title text-blue-300 text-lg md:text-xl font-bold text-center">Add Item</h2>
      <p className="text-gray-100 text-sm md:text-lg text-center">Sell your waste by adding a new listing</p>
      <div className="card-actions justify-center mt-auto">
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: '#2563EB' }}
          whileTap={{ scale: 0.95 }}
          className="btn bg-blue-600 text-white hover:bg-blue-700 border-none px-6 py-2 rounded-lg shadow-lg text-sm md:text-base"
          onClick={() => navigate('/add-waste')}
        >
          Analyze
        </motion.button>
      </div>
    </div>
  </motion.div>


  <motion.div
    variants={cardAnimation}
    whileHover="hover"
    className="card bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 w-full md:w-96 h-64 sm:h-72 shadow-xl border border-blue-300/30 rounded-xl overflow-hidden flex flex-col"
  >
    <div className="card-body p-6 flex flex-col h-full">
      <h2 className="card-title text-blue-300 text-lg md:text-xl font-bold text-center">Analyze Waste</h2>
      <p className="text-gray-100 text-sm md:text-lg text-center">Get recycling recommendations based on waste</p>
      <div className="card-actions justify-center mt-auto">
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: '#2563EB' }}
          whileTap={{ scale: 0.95 }}
          className="btn bg-blue-600 text-white hover:bg-blue-700 border-none px-6 py-2 rounded-lg shadow-lg text-sm md:text-base"
          onClick={() => navigate('/analyze', { 
            state: { totalEarnings, recycledAmount } 
          })}
        >
          Analyze
        </motion.button>
      </div>
    </div>
  </motion.div>




  <motion.div
    variants={cardAnimation}
    whileHover="hover"
    className="card bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 w-full md:w-96 h-64 sm:h-72 shadow-xl border border-blue-300/30 rounded-xl overflow-hidden flex flex-col"
  >
    <div className="card-body p-6 flex flex-col h-full">
      <h2 className="card-title text-blue-300 text-lg md:text-xl font-bold text-center">Recycle Insights</h2>
      <p className="text-gray-100 text-sm md:text-lg text-center">Discover your environmental impact</p>
      <div className="card-actions justify-center mt-auto">
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: '#2563EB' }}
          whileTap={{ scale: 0.95 }}
          className="btn bg-blue-600 text-white hover:bg-blue-700 border-none px-6 py-2 rounded-lg shadow-lg text-sm md:text-base"
          onClick={() => navigate('/recycle-insights', { 
            state: { totalEarnings, recycledAmount } 
          })}
        >
          View Insights
        </motion.button>
      </div>
    </div>
  </motion.div>
</motion.div>

      </div>
    </AnimatePresence>
  );
};

export default SellerDashboard;