import React, { useState, useEffect } from "react";
import API from "../utils/api";
import { ToastContainer, toast } from 'react-toastify';
import { motion} from "framer-motion";
import Loader from '../components/Loader'

const BuyersList = () => {
  const [buyersData, setBuyersData] = useState([]);
  

  useEffect(() => {
   
    const fetchBuyersList = async () => {
      try {
        const response = await API.get("/buyer/list", { withCredentials: true });
        setBuyersData(response.data);
      } catch (error) {
        console.log(error);
      } 
    };

    fetchBuyersList();
  }, []);

  const handleAction = async (wasteId, buyerId, action, price) => {
    try {
      await API.put(
        `/buyer/accept-or-reject/${wasteId}`,
        { buyerId, action, price },
        { withCredentials: true }
      );

      if (action === "accept") {
        setBuyersData(buyersData.filter((waste) => waste._id !== wasteId));
        toast.success("Accepted successfully!");
      } else {
        setBuyersData((prevData) =>
          prevData.map((waste) => ({
            ...waste,
            buyers: waste.buyers.filter((buyer) => buyer.buyerId._id !== buyerId),
          }))
        );
        toast.info("Buyer rejected");
      }
    } catch (error) {
      toast.error("Error processing the action.");
    }
  };

  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemAnimation = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  
  return (
    <div className="min-h-screen bg-white p-6 relative">
      <div className="absolute inset-0 w-full h-full opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path
                d="M 30 0 L 0 0 0 30"
                fill="none"
                stroke="rgba(37, 99, 235, 0.5)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <ToastContainer />
      
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8 text-center text-blue-900"
      >
        Interested Buyers
      </motion.h1>

      {buyersData.length === 0 ? (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-blue-800 text-lg"
        >
          No buyers available at the moment.
        </motion.p>
      ) : (
        <motion.ul
          variants={containerAnimation}
          initial="hidden"
          animate="visible"
          className="space-y-6 max-w-4xl mx-auto"
        >
          {buyersData.map((waste) => (
            <motion.li
              key={waste._id}
              variants={itemAnimation}
              className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 p-6 rounded-xl shadow-xl border border-blue-300/30 flex flex-col md:flex-row gap-6"
            >
              <div className="flex-shrink-0">
                <img
                  src={waste.imageUrl}
                  alt={waste.title}
                  className="w-32 h-32 object-cover rounded-lg border-2 border-blue-300 shadow-lg"
                />
              </div>
              
              <div className="flex-grow text-white">
                <h3 className="text-xl font-bold text-blue-300 mb-2">{waste.title}</h3>
                <p className="text-lg mb-2">
                  Price: <span className="text-blue-300 font-semibold">${waste.price}</span>
                </p>
                
                <div className="mt-4">
                  <h4 className="text-lg font-semibold text-blue-200 mb-2">Interested Buyers:</h4>
                  <ul className="space-y-4">
                    {waste.buyers.map((buyer) => (
                      <li key={buyer.buyerId._id} className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                        <div className="flex justify-between items-center flex-wrap gap-4">
                          <div>
                            <p className="text-lg font-medium">{buyer.buyerId.name}</p>
                            <p className="text-blue-300">
                              Offered: <span className="font-bold">${buyer.amount}</span>
                            </p>
                          </div>
                          
                          <div className="flex gap-3">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleAction(waste._id, buyer.buyerId._id, "accept", waste.price)}
                              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg transition-colors duration-200"
                            >
                              Accept
                            </motion.button>
                            
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleAction(waste._id, buyer.buyerId._id, "reject")}
                              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-lg transition-colors duration-200"
                            >
                              Reject
                            </motion.button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  );
};

export default BuyersList;