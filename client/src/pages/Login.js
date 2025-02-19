import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import API from "../utils/api"; // Added missing API import

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = credentials;
      const loginResponse = await API.post(
        "/user/login",
        { email, password },
        { withCredentials: true }
      );

      if (loginResponse.status === 200) {
        toast.success("Login successful!");
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("role", loginResponse.data.role);
        localStorage.setItem("userName", loginResponse.data.name);

        setTimeout(() => {
          navigate("/dashboard");
          window.location.reload();
        }, 2000);
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (err) {
      toast.error("Login failed. Please check your credentials.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
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
      
      <div className="flex flex-col md:flex-row items-center gap-8 px-4">
        {/* IRA Design Illustration Container */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="md:w-96"
        >
          <div className="relative">
            <img src="/online-world-animate.svg" className="w-200 h-200" />
            
          </div>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 rounded-xl shadow-2xl p-8 relative z-10 border border-blue-300/30"
        >
          <div className="backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl font-bold mb-8 text-center text-white">
                Welcome to <span className="text-blue-300">Recyc</span>Link
              </h1>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-blue-200 mb-2 text-lg">Email</label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="email"
                  className="w-full p-3 bg-white/10 border border-blue-300/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                  value={credentials.email}
                  onChange={(e) =>
                    setCredentials({ ...credentials, email: e.target.value })
                  }
                  required
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-blue-200 mb-2 text-lg">Password</label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="password"
                  className="w-full p-3 bg-white/10 border border-blue-300/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  required
                />
              </motion.div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, backgroundColor: '#2563EB' }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg"
              >
                Login
              </motion.button>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-center"
            >
              <p className="text-blue-200">
                New User?{" "}
                <motion.button
                  onClick={() => navigate("/register")}
                  whileHover={{ scale: 1.05 }}
                  className="text-blue-300 hover:text-blue-200 font-semibold"
                >
                  Sign Up
                </motion.button>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;