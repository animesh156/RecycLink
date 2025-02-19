import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ToastContainer } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");
  const userRole = localStorage.getItem("role");

  const handleDashboardClick = () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (userRole === "buyer") {
      navigate("/buyer-dashboard");
    } else if (userRole === "seller") {
      navigate("/seller-dashboard");
    }
  };

  const values = [
    {
      title: "Sustainability",
      description: "Committed to reducing environmental waste and promoting responsible recycling.",
      icon: "🌱"
    },
    {
      title: "Innovation",
      description: "Leveraging technology to create smarter and more efficient recycling solutions.",
      icon: "💡"
    },
    {
      title: "Transparency",
      description: "Ensuring a trustworthy and fair marketplace for all users.",
      icon: "🔍"
    },
    {
      title: "Community Impact",
      description: "Encouraging collective action to build a more sustainable future.",
      icon: "🤝"
    },
    {
      title: "Collaboration",
      description: "Partnering with recyclers, businesses, and consumers to maximize waste repurposing.",
      icon: "🤲"
    },
    {
      title: "Circular Economy",
      description: "Promoting reuse, refurbishing, and recycling to extend product lifecycles.",
      icon: "♻️"
    }
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Pattern */}
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

      {/* Modern Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 p-6"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">
            <span className="text-blue-300">Recyc</span>Link
          </h1>
          <motion.button
            onClick={handleDashboardClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 px-6 py-2 rounded-lg text-white font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg"
          >
            Go to Dashboard
          </motion.button>
        </div>
      </motion.header>
      
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:w-1/2"
          >
            <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 rounded-xl p-8 shadow-2xl border border-blue-300/30">
              <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-blue-200 mb-6">
                RecycLink bridges the gap between waste generators and upcyclers, creating a seamless marketplace for recycling and repurposing waste products.
              </p>
              <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
              <p className="text-blue-200">
                To be the leading digital platform that transforms waste into opportunity, empowering businesses and individuals to participate in a sustainable future.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:w-1/2"
          >
            <img src="/Hamsa.gif" className="w-full" alt="RecycLink Illustration" />
          </motion.div>
        </div>

        {/* Values Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 rounded-xl p-6 shadow-xl border border-blue-300/30"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-blue-200 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Home;