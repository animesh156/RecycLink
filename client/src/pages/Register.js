import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { name, email, password, role } = formData;
      const response = await API.post(
        "/user/register",
        { name, email, password, role },
        { withCredentials: true }
      );

      if (response.status === 201) {
        toast.success("Registered Successfully");
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("userName", response.data.name);

        setTimeout(() => {
          navigate("/dashboard");
          window.location.reload();
        }, 2000);
      }
    } catch (err) {
      if (err.response?.status === 400) {
        toast.error("Email is already registered");
      } else {
        toast.error("Registration failed. Please try again.");
      }
      console.error("Registration error:", err);
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
            <img src="/Good team-cuate.svg"  className="w-200 h-96" />
            <a 
              href="https://iradesign.io" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm text-blue-500 hover:text-blue-600 absolute bottom-0 left-0 bg-white/80 px-2 py-1 rounded-tr-lg"
            >
              
            </a>
          </div>
        </motion.div>

        {/* Register Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 rounded-xl shadow-2xl p-8 relative z-10 border border-blue-300/30"
        >
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-4xl font-bold mb-8 text-center text-white"
          >
            Join <span className="text-blue-300">Recyc</span>Link
          </motion.h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-blue-200 mb-2 text-lg">Name</label>
              <input
                type="text"
                className="w-full p-3 bg-white/10 border border-blue-300/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="Enter your name"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-blue-200 mb-2 text-lg">Email</label>
              <input
                type="email"
                className="w-full p-3 bg-white/10 border border-blue-300/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                placeholder="Enter your email"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-blue-200 mb-2 text-lg">Password</label>
              <input
                type="password"
                className="w-full p-3 bg-white/10 border border-blue-300/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                placeholder="Create a password"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-blue-200 mb-2 text-lg">Role</label>
              <select
                className="w-full p-3 bg-white/10 border border-blue-300/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="buyer" className="bg-blue-900">Buyer</option>
                <option value="seller" className="bg-blue-900">Seller</option>
              </select>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: '#2563EB' }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg mt-8"
            >
              Register
            </motion.button>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-6 text-center"
          >
            <p className="text-blue-200">
              Already have an account?{" "}
              <motion.button
                onClick={() => navigate("/login")}
                whileHover={{ scale: 1.05 }}
                className="text-blue-300 hover:text-blue-200 font-semibold"
              >
                Login here
              </motion.button>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;